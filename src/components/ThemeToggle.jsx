// Both icons stay in the button so one can spin out while the other spins in
// (the spin is styled in global.css, same as the portfolio).
function ThemeToggle({ theme, toggleTheme, className = '' }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`theme-toggle-btn ${isDark ? 'is-dark' : 'is-light'} relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#d4af37]/50 text-[#d4af37] transition-colors hover:bg-[#d4af37]/10 ${className}`}
    >
      <svg className="theme-icon theme-icon-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-icon theme-icon-moon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
