import { useEffect, useState } from 'react'
import { Heart, LayoutDashboard, Menu, Search, X } from 'lucide-react'
import GrapeIcon from './GrapeIcon'
import ThemeToggle from './ThemeToggle'
import NavSearch from './NavSearch'

function Header({
  currentView,
  setCurrentView,
  theme,
  toggleTheme,
  isOwner,
  savedCount,
  items = [],
  onSelectItem,
  onSearch,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  // True once the page is scrolled down a little. The navbar then gets slimmer,
  // slightly see-through with a blur, and its gold line brightens.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const [searchOpen, setSearchOpen] = useState(false)

  function goTo(view) {
    setCurrentView(view)
    setMenuOpen(false)
    setSearchOpen(false)
  }

  // The magnifying glass. data-nav-search-toggle tells NavSearch's "click outside
  // closes it" check to leave this button alone, so it can toggle the panel itself.
  const searchButton = (
    <button
      type="button"
      data-nav-search-toggle
      onClick={() => {
        setSearchOpen((open) => !open)
        setMenuOpen(false)
      }}
      aria-label={searchOpen ? 'Close search' : 'Search'}
      aria-expanded={searchOpen}
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-[#d4af37] transition-colors hover:bg-[#d4af37]/10 ${
        searchOpen ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#d4af37]/50'
      }`}
    >
      {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
    </button>
  )

  // Phone menu links: gold, and white for the page you're on.
  const navLinkClasses = (view) =>
    `transition-colors ${
      currentView === view
        ? 'text-white font-semibold'
        : 'text-[#d4af37] hover:text-[#e0c04d]'
    }`

  // Desktop links: a gold line grows in under a link while you hover it.
  // The page you're on is shown in white.
  // (The line is drawn with Tailwind's after: classes, which add a small extra piece after the text.)
  const underlineClasses = (view) =>
    `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#d4af37] after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
      currentView === view ? 'text-white hover:text-[#d4af37]' : 'text-neutral-300 hover:text-[#d4af37]'
    } after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100`

  // Saved as a round button (matches search and dark mode), with the count in a small gold bubble.
  const savedButton = (
    <button
      type="button"
      onClick={() => goTo('saved')}
      aria-label={savedCount > 0 ? `Saved items (${savedCount})` : 'Saved items'}
      aria-current={currentView === 'saved' ? 'page' : undefined}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border text-[#d4af37] transition-colors hover:bg-[#d4af37]/10 ${
        currentView === 'saved' ? 'border-[#d4af37] bg-[#d4af37]/15' : 'border-[#d4af37]/50'
      }`}
    >
      <Heart className="h-4 w-4" fill={savedCount > 0 || currentView === 'saved' ? 'currentColor' : 'none'} />
      {savedCount > 0 && (
        <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-[#d4af37] px-1 text-center text-[10px] font-bold leading-[18px] text-[#1a1a1a]">
          {savedCount}
        </span>
      )}
    </button>
  )

  // "Saved" link with a little count bubble once something is hearted.
  const savedLink = (classesFor = navLinkClasses, extraClasses = '') => (
    <button
      type="button"
      onClick={() => goTo('saved')}
      className={`flex items-center gap-1.5 ${classesFor('saved')} ${extraClasses}`}
    >
      <Heart className="h-4 w-4" fill={currentView === 'saved' ? 'currentColor' : 'none'} />
      Saved
      {savedCount > 0 && (
        <span className="rounded-full bg-[#d4af37] px-1.5 text-xs font-bold text-[#1a1a1a]">
          {savedCount}
        </span>
      )}
    </button>
  )

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 motion-reduce:transition-none ${
        scrolled ? 'bg-[#2d2d2d]/80 shadow-lg backdrop-blur-md' : 'bg-[#2d2d2d] shadow-md'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all sm:px-6 duration-300 motion-reduce:transition-none ${
          scrolled ? 'py-2' : 'py-5'
        }`}
      >
        <button
          type="button"
          onClick={() => goTo('home')}
          className="flex items-center gap-2"
        >
          <GrapeIcon className={`text-[#d4af37] transition-all duration-300 ${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
          <span
            className={`whitespace-nowrap font-serif-display italic text-[#d4af37] transition-all duration-300 ${
              // a bit smaller on very narrow phones so the name stays on one line
              scrolled ? 'text-base sm:text-lg' : 'text-base min-[360px]:text-lg sm:text-xl'
            }`}
          >
            TJ's Trading Post
          </span>
        </button>

        <nav className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goTo('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
              className={underlineClasses('home')}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => goTo('about')}
              aria-current={currentView === 'about' ? 'page' : undefined}
              className={underlineClasses('about')}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => goTo('marketplace')}
              aria-current={currentView === 'marketplace' ? 'page' : undefined}
              className={underlineClasses('marketplace')}
            >
              Browse Items
            </button>
          </div>
          {/* Thin divider between the pages and the round buttons */}
          <span className="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />
          {searchButton}
          {savedButton}
          {isOwner && (
            <button
              type="button"
              onClick={() => goTo('admin')}
              className="flex items-center gap-1 rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </button>
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 md:hidden">
          {searchButton}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            className="text-[#d4af37]"
            onClick={() => {
              setMenuOpen((open) => !open)
              setSearchOpen(false)
            }}
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
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden">
          <button
            type="button"
            onClick={() => goTo('home')}
            className={`text-left ${navLinkClasses('home')}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => goTo('about')}
            className={`text-left ${navLinkClasses('about')}`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => goTo('marketplace')}
            className={`text-left ${navLinkClasses('marketplace')}`}
          >
            Browse Items
          </button>
          {savedLink(navLinkClasses, 'w-fit')}
          {isOwner && (
            <button
              type="button"
              onClick={() => goTo('admin')}
              className="flex w-fit items-center gap-1 rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-[#1a1a1a] hover:bg-[#e0c04d]"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </button>
          )}
        </div>
      )}

      {searchOpen && (
        <NavSearch
          items={items}
          onSelectItem={onSelectItem}
          onSeeAll={onSearch}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {/* Thin gold line along the bottom, matching the one on top of the footer */}
      <div
        className={`h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-300 ${
          scrolled ? 'via-[#d4af37]' : 'via-[#d4af37]/70'
        }`}
      />
    </header>
  )
}

export default Header
