import { Moon, Sun } from 'lucide-react'

function ThemeToggle({ theme, toggleTheme, className = '' }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50 text-[#d4af37] transition-colors hover:bg-[#d4af37]/10 ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export default ThemeToggle
