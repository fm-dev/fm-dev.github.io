const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const mobileTabs = window.matchMedia('(max-width: 639px)');

menuButton.hidden = false;

// The kit owns the menu; keep the covered page out of the keyboard order.
new MutationObserver(() => {
  const open = header.classList.contains('is-open') && !mobileTabs.matches;
  main.inert = open;
  footer.inert = open;
}).observe(header, { attributes: true, attributeFilter: ['class'] });

header.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || !header.classList.contains('is-open')) return;
  const controls = [...header.querySelectorAll('a[href], button:not([hidden])')]
    .filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const sectionLinks = [...header.querySelectorAll('.nav__link[href^="#"]')];
let tabFrame;
function updateActiveTab() {
  cancelAnimationFrame(tabFrame);
  tabFrame = requestAnimationFrame(() => {
    let active = mobileTabs.matches ? sectionLinks[0] : null;
    if (mobileTabs.matches) {
      sectionLinks.forEach(link => {
        if (document.querySelector(link.getAttribute('href')).getBoundingClientRect().top <= innerHeight * 0.35) active = link;
      });
    }
    sectionLinks.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}
mobileTabs.addEventListener('change', () => {
  if (mobileTabs.matches && header.classList.contains('is-open')) menuButton.click();
  updateActiveTab();
});
window.addEventListener('scroll', updateActiveTab, { passive: true });
window.addEventListener('resize', updateActiveTab);
document.addEventListener('languagechange', updateActiveTab);
updateActiveTab();
