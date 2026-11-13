(() => {
  const section = document.querySelector('#github-activity');
  const status = section.querySelector('.contribution-status');
  const chart = section.querySelector('.contribution-chart');
  const calendar = section.querySelector('.contribution-calendar');
  const summary = section.querySelector('.contribution-summary');
  const detail = section.querySelector('.contribution-detail');
  const yearSelect = section.querySelector('#contribution-year');
  const retry = section.querySelector('.contribution-retry');
  const i18n = window.portfolioI18n;
  const t = i18n.t;
  const dayLength = 86400000;
  let contributions = [];
  let dayButtons = [];
  let state = 'loading';

  function updateStatus() {
    status.textContent = t(state === 'error' ? 'github.error' : 'github.loading');
  }

  function renderCalendar() {
    const locale = i18n.language;
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' });
    const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
    const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const start = new Date(today);
    let end = today;
    if (yearSelect.value === 'last') {
      start.setUTCFullYear(start.getUTCFullYear() - 1);
      start.setUTCDate(start.getUTCDate() + 1);
    } else {
      start.setTime(Date.UTC(Number(yearSelect.value), 0, 1));
      end = new Date(Math.min(Date.UTC(Number(yearSelect.value), 11, 31), today.getTime()));
    }
    const firstDate = start.toISOString().slice(0, 10);
    const lastDate = end.toISOString().slice(0, 10);
    const days = contributions.filter(day => day.date >= firstDate && day.date <= lastDate);
    if (!days.length) throw new Error('No contribution data for this period');
    const byDate = new Map(days.map(day => [day.date, day]));
    const total = days.reduce((sum, day) => sum + day.count, 0);
    summary.textContent = t('github.total', {
      count: total.toLocaleString(locale),
      contributions: total === 1 ? 'contribution' : 'contributions',
      period: yearSelect.value === 'last' ? t('github.lastPeriod') : t('github.yearPeriod', { year: yearSelect.value })
    });

    const offset = start.getUTCDay();
    const dayCount = Math.round((end - start) / dayLength) + 1;
    const weekCount = Math.ceil((offset + dayCount) / 7);
    const table = document.createElement('table');
    table.className = 'contribution-table';
    const caption = table.createCaption();
    caption.className = 'visually-hidden';
    caption.textContent = `${summary.textContent}. ${t('github.keyboard')}`;
    const heading = table.createTHead().insertRow();
    heading.append(document.createElement('td'));
    let previousMonth;
    for (let week = 0; week < weekCount; week++) {
      const date = new Date(start.getTime() + Math.max(0, week * 7 - offset) * dayLength);
      const month = date.getUTCMonth();
      const label = document.createElement('th');
      label.scope = 'col';
      if (month !== previousMonth && week < weekCount - 1) {
        const name = document.createElement('span');
        name.className = 'contribution-month';
        name.textContent = monthFormat.format(date);
        label.append(name);
      }
      previousMonth = month;
      heading.append(label);
    }
    const body = table.createTBody();
    const buttonsByDate = new Map();
    for (let weekday = 0; weekday < 7; weekday++) {
      const row = body.insertRow();
      const label = document.createElement('th');
      label.scope = 'row';
      const name = document.createElement('span');
      name.textContent = weekdayFormat.format(new Date(Date.UTC(2024, 0, 7 + weekday)));
      if (weekday % 2 === 0) name.className = 'visually-hidden';
      label.append(name);
      row.append(label);
      for (let week = 0; week < weekCount; week++) {
        const cell = row.insertCell();
        const index = week * 7 + weekday - offset;
        if (index < 0 || index >= dayCount) continue;
        const date = new Date(start.getTime() + index * dayLength);
        const key = date.toISOString().slice(0, 10);
        const day = byDate.get(key);
        // Missing source data stays blank rather than implying zero contributions.
        if (!day) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'contribution-day';
        button.dataset.level = day.level;
        button.dataset.date = key;
        button.tabIndex = -1;
        button.setAttribute('aria-label', t('github.day', {
          count: day.count === 0 && locale === 'en' ? 'No' : day.count.toLocaleString(locale),
          contributions: day.count === 1 ? 'contribution' : 'contributions',
          date: dateFormat.format(date)
        }));
        button.title = button.getAttribute('aria-label');
        cell.append(button);
        buttonsByDate.set(key, button);
      }
    }
    dayButtons = days.map(day => buttonsByDate.get(day.date));
    dayButtons[0].tabIndex = 0;
    calendar.replaceChildren(table);
    chart.hidden = false;
    detail.textContent = t('github.hint');
    calendar.scrollLeft = yearSelect.value === 'last' ? calendar.scrollWidth : 0;
  }

  function showDay(event) {
    const button = event.target.closest('.contribution-day');
    if (!button) return;
    detail.textContent = button.getAttribute('aria-label');
    dayButtons.forEach(day => { day.tabIndex = day === button ? 0 : -1; });
  }
  calendar.addEventListener('pointerover', showDay);
  calendar.addEventListener('focusin', showDay);
  calendar.addEventListener('click', showDay);
  calendar.addEventListener('keydown', event => {
    const index = dayButtons.indexOf(event.target);
    if (index < 0) return;
    const steps = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7, Home: -index, End: dayButtons.length - index - 1 };
    if (!(event.key in steps)) return;
    event.preventDefault();
    dayButtons[Math.max(0, Math.min(dayButtons.length - 1, index + steps[event.key]))].focus();
  });

  async function loadContributions() {
    state = 'loading';
    section.setAttribute('aria-busy', 'true');
    status.hidden = false;
    updateStatus();
    retry.hidden = true;
    yearSelect.disabled = true;
    chart.hidden = true;
    try {
      const response = await fetch('https://github-contributions-api.jogruber.de/v4/fm-dev?y=all', { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Contribution request failed');
      const data = await response.json();
      if (!Array.isArray(data.contributions) || !data.contributions.length || !data.contributions.every(day =>
        /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
        Number.isFinite(Date.parse(`${day.date}T00:00:00Z`)) &&
        new Date(`${day.date}T00:00:00Z`).toISOString().slice(0, 10) === day.date &&
        Number.isSafeInteger(day.count) && day.count >= 0 &&
        Number.isInteger(day.level) && day.level >= 0 && day.level <= 4
      )) throw new Error('Invalid contribution data');
      contributions = data.contributions.sort((a, b) => a.date.localeCompare(b.date));
      const years = [...new Set(contributions.map(day => day.date.slice(0, 4)))].sort().reverse();
      yearSelect.replaceChildren(new Option(t('github.last'), 'last'), ...years.map(year => new Option(year, year)));
      renderCalendar();
      state = 'ready';
      status.hidden = true;
      yearSelect.disabled = false;
    } catch {
      state = 'error';
      updateStatus();
      retry.hidden = false;
    } finally {
      section.setAttribute('aria-busy', 'false');
    }
  }
  yearSelect.addEventListener('change', renderCalendar);
  retry.addEventListener('click', loadContributions);
  document.addEventListener('languagechange', () => {
    yearSelect.options[0].textContent = t('github.last');
    if (state === 'ready') renderCalendar();
    else updateStatus();
  });
  loadContributions();
})();
