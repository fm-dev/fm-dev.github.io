(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let savedTheme;
  let themeButton;

  try {
    savedTheme = localStorage.getItem('theme');
  } catch {
    // Storage may be unavailable in private or restricted browsing.
  }
  if (savedTheme !== 'light' && savedTheme !== 'dark') savedTheme = null;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.dataset.tone = theme;
    themeColor.setAttribute('content', theme === 'dark' ? '#101216' : '#eef0f3');
    if (themeButton) {
      const nextMode = theme === 'dark' ? 'light' : 'dark';
      themeButton.setAttribute('aria-label', `Switch to ${nextMode} mode`);
      themeButton.querySelector('.theme-label').textContent = `${nextMode === 'dark' ? 'Dark' : 'Light'} mode`;
    }
  }

  // Apply before styles load to avoid a flash of the wrong theme.
  applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));

  systemTheme.addEventListener('change', (event) => {
    if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', () => {
    themeButton = document.querySelector('.theme-toggle');
    applyTheme(root.dataset.theme);
    themeButton.hidden = false;
    themeButton.addEventListener('click', () => {
      savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(savedTheme);
      try {
        localStorage.setItem('theme', savedTheme);
      } catch {
        // Keep the selected theme for this page when storage is blocked.
      }
    });
  });
})();
