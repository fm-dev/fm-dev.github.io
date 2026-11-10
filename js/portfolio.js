const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

menuButton.hidden = false;

// The kit owns the menu; keep the covered page out of the keyboard order.
new MutationObserver(() => {
  const open = header.classList.contains('is-open');
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
