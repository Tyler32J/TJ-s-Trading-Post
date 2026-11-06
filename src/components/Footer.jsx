import { ChevronUp, Lock, Mail, MapPin, Phone } from 'lucide-react'
import GrapeIcon from './GrapeIcon'
import { CONTACT } from '../data'
import SocialLinks from './SocialLinks'

// The same gold line as the navbar links: it grows in under a footer link while you hover it.
const hoverLine =
  'relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:rounded-full after:bg-[#d4af37] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none'

const linkClasses = `w-fit text-center sm:text-left text-sm text-neutral-400 transition-colors hover:text-[#d4af37] ${hoverLine}`
// Every column uses this: fully centered on phones; on wider screens each column sits
// centered in its own space while its links stay lined up with each other.
const columnClasses =
  'flex flex-col items-center text-center sm:items-start sm:text-left lg:justify-self-center'

const headingClasses = 'mb-3 text-xs font-semibold uppercase tracking-widest text-[#d4af37]'

// "Organized columns" footer: brand, Shop, About, and Contact, left-aligned like a storefront,
// with a slim bottom bar for the copyright, the owner lock, and a "Back to top" link.
function Footer({ setCurrentView, isOwner, onBrowseType, onCustomOrder }) {
  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="bg-[#2d2d2d] text-neutral-300">
      {/* A thin gold line across the top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className={`${columnClasses} gap-3`}>
          <button type="button" onClick={() => setCurrentView('home')} className="flex w-fit items-center gap-2">
            <GrapeIcon className="h-5 w-5 text-[#d4af37]" />
            <span className="font-serif-display text-lg italic text-[#d4af37]">TJ's Trading Post</span>
          </button>
          <p className="max-w-xs text-sm text-neutral-400">
            Collectibles, antiques, and handmade wood &amp; metal work from {CONTACT.location}.
          </p>
          <SocialLinks />
        </div>

        {/* Shop */}
        <nav aria-label="Shop" className={columnClasses}>
          <h4 className={headingClasses}>Shop</h4>
          <div className="flex flex-col items-center gap-2.5 sm:items-start">
            <button type="button" onClick={() => setCurrentView('marketplace')} className={linkClasses}>
              Browse Items
            </button>
            <button type="button" onClick={() => onBrowseType('trade')} className={linkClasses}>
              For Trade
            </button>
            <button type="button" onClick={() => onBrowseType('buy')} className={linkClasses}>
              Wanted
            </button>
            <button type="button" onClick={() => setCurrentView('saved')} className={linkClasses}>
              Saved
            </button>
          </div>
        </nav>

        {/* About */}
        <nav aria-label="About" className={columnClasses}>
          <h4 className={headingClasses}>About</h4>
          <div className="flex flex-col items-center gap-2.5 sm:items-start">
            <button type="button" onClick={() => setCurrentView('about')} className={linkClasses}>
              About Tyler
            </button>
            <button type="button" onClick={onCustomOrder} className={linkClasses}>
              Custom orders
            </button>
            <button type="button" onClick={() => setCurrentView('home')} className={linkClasses}>
              Home
            </button>
            {isOwner && (
              <button type="button" onClick={() => setCurrentView('admin')} className={linkClasses}>
                Admin
              </button>
            )}
          </div>
        </nav>

        {/* Contact */}
        <div className={columnClasses}>
          <h4 className={headingClasses}>Contact</h4>
          <ul className="flex flex-col items-center gap-2.5 text-sm sm:items-start">
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
              <a href={`mailto:${CONTACT.email}`} className={`break-all text-neutral-400 transition-colors hover:text-[#d4af37] ${hoverLine}`}>
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
              <a href={`tel:${CONTACT.phone}`} className={`text-neutral-400 transition-colors hover:text-[#d4af37] ${hoverLine}`}>
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.location)}`}
                target="_blank"
                rel="noreferrer"
                className={`text-neutral-400 transition-colors hover:text-[#d4af37] ${hoverLine}`}
              >
                {CONTACT.location}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-center text-xs text-neutral-500 sm:flex-row">
          <span className="flex items-center gap-2">
            &copy; {new Date().getFullYear()} TJ's Trading Post. All rights reserved.
            {/* The small, unlabeled owner entrance to /admin */}
            <button
              type="button"
              onClick={() => setCurrentView('admin')}
              aria-label="Owner access"
              className="text-neutral-600 transition-colors hover:text-neutral-400"
            >
              <Lock className="h-3 w-3" />
            </button>
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 transition-colors hover:text-[#d4af37]"
          >
            Back to top
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
