const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navbarSupportedContent');
const compactNavigation = window.matchMedia('(max-width: 44rem)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.hidden = compactNavigation.matches;
}

function syncNavigation() {
  menuButton.hidden = !compactNavigation.matches;
  closeMenu();
}

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.hidden = expanded;
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

compactNavigation.addEventListener('change', syncNavigation);
syncNavigation();
