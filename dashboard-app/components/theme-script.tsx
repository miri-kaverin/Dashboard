/**
 * Blocking theme script for SSR only (avoids next-themes React 19 script-in-component warning).
 * @see https://github.com/pacocoursey/next-themes/issues/385
 */
export function ThemeScript() {
  const code = `
(function() {
  try {
    var storageKey = 'theme';
    var defaultTheme = 'system';
    var themes = ['light', 'dark'];
    var d = document.documentElement;
    var stored = localStorage.getItem(storageKey) || defaultTheme;
    var resolved = stored;
    if (stored === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    d.classList.remove.apply(d.classList, themes);
    d.classList.add(resolved);
    d.style.colorScheme = resolved;
  } catch (e) {}
})();
`.trim()

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  )
}
