import { useState } from 'react'
import { Menu, Plus, X } from 'lucide-react'
import GrapeIcon from './GrapeIcon'
import ThemeToggle from './ThemeToggle'

function Header({ currentView, setCurrentView, theme, toggleTheme, isOwner }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function goTo(view) {
    setCurrentView(view)
    setMenuOpen(false)
  }

  const navLinkClasses = (view) =>
    `transition-colors ${
      currentView === view
        ? 'text-white font-semibold'
        : 'text-[#d4af37] hover:text-[#e0c04d]'
    }`

  return (
    <header className="sticky top-0 z-40 bg-[#1a1a1a] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => goTo('home')}
          className="flex items-center gap-2"
        >
          <GrapeIcon className="h-6 w-6 text-[#d4af37]" />
          <span className="font-serif-display text-xl italic text-[#d4af37]">
            TJ's Trading Post
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={() => goTo('home')}
            className={navLinkClasses('home')}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => goTo('marketplace')}
            className={navLinkClasses('marketplace')}
          >
            Browse Items
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={() => goTo('list-item')}
              className="flex items-center gap-1 rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
            >
              <Plus className="h-4 w-4" />
              List Item
            </button>
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            className="text-[#d4af37]"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-[#2d2d2d] px-6 py-4 md:hidden">
          <button
            type="button"
            onClick={() => goTo('home')}
            className={`text-left ${navLinkClasses('home')}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => goTo('marketplace')}
            className={`text-left ${navLinkClasses('marketplace')}`}
          >
            Browse Items
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={() => goTo('list-item')}
              className="flex w-fit items-center gap-1 rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-[#1a1a1a] hover:bg-[#e0c04d]"
            >
              <Plus className="h-4 w-4" />
              List Item
            </button>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
