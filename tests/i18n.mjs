// Run with Node 22+ and a local Chrome/Chromium installation; no packages required.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const chromePath = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find(file => fs.existsSync(file));
assert.ok(chromePath, 'Set CHROME_PATH to a Chrome/Chromium executable');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-i18n-'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const chrome = spawn(chromePath, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Chrome startup timed out')), 15000);
    let output = '';
    chrome.on('error', reject);
    chrome.stderr.on('data', chunk => {
      output += chunk;
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  socket = new WebSocket(endpoint);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
  });
  const call = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
  const cdp = (method, params) => call(method, params, sessionId);
  const evaluate = async expression => {
    const result = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    assert.ok(!result.exceptionDetails, result.exceptionDetails?.text + ': ' + result.result?.description);
    return result.result.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 150; i++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Timed out: ${expression}`);
  };
  await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `
    Object.defineProperty(navigator, 'language', { value: 'id-ID' });
    window.testRequests = 0;
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (!String(args[0]).includes('github-contributions-api')) return originalFetch(...args);
      window.testRequests++;
      await new Promise(resolve => setTimeout(resolve, 400));
      if (localStorage.getItem('test-fail')) throw new Error('Simulated outage');
      const today = new Date();
      const contributions = Array.from({ length: 730 }, (_, i) => {
        const date = new Date(today); date.setDate(date.getDate() - i);
        return { date: date.toISOString().slice(0, 10), count: i % 5, level: i % 5 };
      });
      return { ok: true, json: async () => ({ contributions }) };
    };
  ` });
  await cdp('Page.navigate', { url });
  await waitFor(`document.documentElement.dataset.ready && document.querySelectorAll('.contribution-day').length > 0`);
  assert.equal(await evaluate('document.documentElement.lang'), 'id');
  assert.equal(await evaluate(`document.querySelector('#app').textContent`), 'Pengembang web & backend.');
  assert.match(await evaluate('document.title'), /Pengembang/);
  assert.match(await evaluate(`document.querySelector('.contribution-summary').textContent`), /kontribusi dalam 12 bulan terakhir/);
  assert.match(await evaluate(`document.querySelector('.contribution-day').title`), /kontribusi pada/);
  assert.match(await evaluate(`document.querySelector('.mo-wh__text').getAttribute('aria-label')`), /Saya mengembangkan/);
  assert.equal(await evaluate(`[...document.querySelectorAll('[data-i18n]')].filter(el => portfolioI18n.t(el.dataset.i18n) === el.dataset.i18n).length`), 0, 'No missing translation keys');
  const links = await evaluate(`[...document.querySelectorAll('a')].map(el => el.getAttribute('href'))`);

  const click = async selector => {
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({ block: 'nearest' })`);
    const point = await evaluate(`(() => { const rect = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })()`);
    await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
    await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  };
  const switchTo = async (language, waitForAnimation = true) => {
    if (!await evaluate(`document.querySelector('[data-language="${language}"]').getBoundingClientRect().width > 0`)) await click('.menu-toggle');
    await click(`[data-language="${language}"]`);
    await waitFor(`document.documentElement.lang === '${language}'${waitForAnimation ? " && document.querySelector('[data-moment-mounted]')" : ''}`);
  };
  await evaluate(`document.querySelector('#contribution-year').value = document.querySelector('#contribution-year').options[1].value; document.querySelector('#contribution-year').dispatchEvent(new Event('change'))`);
  const period = await evaluate(`document.querySelector('#contribution-year').value`);
  await switchTo('en');
  assert.equal(await evaluate(`document.querySelector('#app').textContent`), 'Web & backend developer.');
  assert.match(await evaluate(`document.querySelector('.mo-wh__text').getAttribute('aria-label')`), /I develop backend services/);
  assert.match(await evaluate(`document.querySelector('.contribution-summary').textContent`), /contributions in \d{4}/);
  assert.equal(await evaluate(`document.querySelector('#contribution-year').value`), period);
  assert.equal(await evaluate('window.testRequests'), 1, 'Changing language must reuse fetched data');
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('a')].map(el => el.getAttribute('href'))`), links);
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  const theme = await evaluate('document.documentElement.dataset.theme');
  await switchTo('id');
  assert.match(await evaluate(`document.querySelector('.theme-toggle').getAttribute('aria-label')`), /Beralih ke mode/);
  assert.equal(await evaluate('document.documentElement.dataset.theme'), theme);
  await cdp('Page.reload');
  await waitFor(`document.documentElement.dataset.ready && document.querySelectorAll('.contribution-day').length > 0`);
  assert.equal(await evaluate('document.documentElement.lang'), 'id', 'Choice persists after reload');
  await switchTo('en');
  await cdp('Page.reload');
  await waitFor(`document.documentElement.dataset.ready && document.querySelectorAll('.contribution-day').length > 0`);
  assert.equal(await evaluate('document.documentElement.lang'), 'en', 'Saved choice overrides browser language');

  for (const width of [1440, 1024, 820, 768, 390, 320]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: width < 640 ? 844 : 900, deviceScaleFactor: 1, mobile: false });
    for (const language of ['id', 'en']) {
      if (await evaluate('document.documentElement.lang') !== language) await switchTo(language);
      assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `No horizontal overflow at ${width}px (${language})`);
      const overflowing = await evaluate(`[...document.querySelectorAll('main > section')].filter(section => section.querySelector(':scope > .wrap')?.getBoundingClientRect().bottom > section.getBoundingClientRect().bottom + 2).map(section => section.id)`);
      assert.deepEqual(overflowing, [], `Section content fits at ${width}px (${language})`);
      if (width >= 640 && width < 1024) {
        await evaluate(`if (!document.querySelector('.site-header').classList.contains('is-open')) document.querySelector('.menu-toggle').click()`);
      }
      assert.ok(await evaluate(`document.querySelector('.language-switch').getBoundingClientRect().width >= 88`), `Language buttons visible at ${width}px`);
      assert.ok(await evaluate(`[...document.querySelectorAll('[data-language]')].every(el => el.getBoundingClientRect().height >= 44)`));
      if (width >= 1024) {
        assert.ok(await evaluate(`document.querySelector('.nav__links').getBoundingClientRect().right <= document.querySelector('.nav__actions').getBoundingClientRect().left`), `Navigation and actions do not overlap at ${width}px (${language})`);
      }
      if (width === 1440 || width === 390) {
        const shot = await cdp('Page.captureScreenshot', { format: 'png' });
        fs.mkdirSync(path.join(root, '.taste-skill/shots'), { recursive: true });
        fs.writeFileSync(path.join(root, `.taste-skill/shots/i18n-${language}-${width}.png`), Buffer.from(shot.data, 'base64'));
      }
      if (width >= 640 && width < 1024) await evaluate(`document.querySelector('.menu-toggle').click()`);
      if (width < 640) {
        assert.ok(await evaluate(`getComputedStyle(document.querySelector('.nav__links')).position === 'fixed' && document.querySelector('.nav__links').getBoundingClientRect().bottom <= innerHeight - 10`), 'Phone navigation stays above the screen bottom');
        assert.ok(await evaluate(`getComputedStyle(document.querySelector('.menu-toggle')).display === 'none'`), 'Phone tabs replace the hamburger');
        for (const target of ['Portofolio', 'Pengalaman', 'tentang_saya', 'skills']) {
          await click(`.nav__link[href="#${target}"]`);
          await waitFor(`location.hash === '#${target}' && document.querySelector('.nav__link[aria-current="location"]').getAttribute('href') === '#${target}'`);
          assert.ok(await evaluate(`!document.querySelector('main').inert && !document.body.classList.contains('nav-locked')`), 'Tab navigation keeps page interactive');
        }
        await evaluate(`window.scrollTo(0, document.documentElement.scrollHeight)`);
        assert.ok(await evaluate(`document.querySelector('.icon-credit').getBoundingClientRect().bottom <= document.querySelector('.nav__links').getBoundingClientRect().top`), 'Last footer link clears the bottom tabs');
        await evaluate(`window.scrollTo(0, 0)`);
      }
    }
  }
  await cdp('Emulation.setDeviceMetricsOverride', { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
  await click('.menu-toggle');
  await waitFor(`document.querySelector('main').inert`);
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await waitFor(`!document.querySelector('main').inert && !document.body.classList.contains('nav-locked')`);
  await evaluate(`localStorage.setItem('test-fail', '1')`);
  await cdp('Page.reload');
  await waitFor(`document.querySelector('.contribution-retry')?.hidden === false`);
  await switchTo('id');
  assert.match(await evaluate(`document.querySelector('.contribution-status').textContent`), /belum tersedia/);
  await switchTo('en');
  assert.match(await evaluate(`document.querySelector('.contribution-status').textContent`), /unavailable/);
  await evaluate(`localStorage.removeItem('test-fail'); document.querySelector('.contribution-retry').click()`);
  await switchTo('id');
  await waitFor(`document.querySelectorAll('.contribution-day').length > 0 && document.querySelector('.contribution-status').hidden`);
  assert.match(await evaluate(`document.querySelector('.contribution-summary').textContent`), /kontribusi/);
  await evaluate(`Storage.prototype.getItem = () => { throw new Error('Blocked'); }; Storage.prototype.setItem = () => { throw new Error('Blocked'); }`);
  await switchTo('en');
  assert.equal(await evaluate('document.documentElement.lang'), 'en', 'Switching works with blocked storage');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: pathToFileURL(path.join(root, 'index.html')).href });
  await waitFor(`document.querySelector('.language-switch')?.hidden === false`);
  const nextLanguage = await evaluate(`document.documentElement.lang === 'id' ? 'en' : 'id'`);
  await switchTo(nextLanguage, false);
  assert.equal(await evaluate('document.documentElement.lang'), nextLanguage, 'Local files switch language even when animation modules cannot load');
  await switchTo(nextLanguage === 'id' ? 'en' : 'id', false);
  await cdp('Emulation.setScriptExecutionDisabled', { value: true });
  await cdp('Page.reload');
  await waitFor(`document.querySelector('#app')?.textContent === 'Web & backend developer.'`);
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert.ok(await evaluate(`document.querySelector('.language-switch').hidden`), 'No inactive language controls without JavaScript');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await waitFor(`getComputedStyle(document.querySelector('.nav__links')).position === 'fixed' && document.querySelector('.nav__links').getBoundingClientRect().width > 0`);
  assert.ok(await evaluate(`getComputedStyle(document.querySelector('.nav__links')).position === 'fixed' && document.querySelector('.nav__links').getBoundingClientRect().width > 0`), 'Bottom navigation works without JavaScript');
  console.log('PASS: bottom tabs, active section, resize from open menu, footer clearance, real pointer clicks, HTTP/local-file switching, persistence, themes, calendar states, no-JS fallback, and six viewport widths.');
} finally {
  socket?.close();
  chrome.kill();
  server.closeAllConnections();
  server.close();
  // Only remove the disposable test profile created above, after Chrome exits.
  await new Promise(resolve => chrome.exitCode !== null ? resolve() : chrome.once('exit', resolve));
  assert.equal(path.dirname(profile), path.resolve(os.tmpdir()));
  assert.ok(path.basename(profile).startsWith('portfolio-i18n-'));
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
