import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Switching themes softly fades the whole page from one look to the other.
// (The toggle icon's spin is separate, in ThemeToggle.jsx + global.css.)
// People who turned on "reduce motion" in their device settings get an instant switch.
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement

    // Changes the page right away. flushSync makes React update the screen
    // immediately instead of a moment later, so the fade ends on the finished
    // new theme rather than a half-updated page.
    const flip = () => {
      flushSync(() => setTheme(next))
      root.classList.toggle('dark', next === 'dark')
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      flip()
      return
    }

    // The View Transition API takes a picture of the page, applies the change,
    // and cross-fades from the old picture to the new page. Its speed is set
    // in global.css (::view-transition-old / -new).
    if (document.startViewTransition) {
      document.startViewTransition(flip)
      return
    }

    // Older browsers: colors fade for half a second instead (.theme-switching in global.css).
    root.classList.add('theme-switching')
    clearTimeout(root.themeSwitchTimer)
    root.themeSwitchTimer = setTimeout(() => root.classList.remove('theme-switching'), 500)
    flip()
  }

  return { theme, toggleTheme }
}
