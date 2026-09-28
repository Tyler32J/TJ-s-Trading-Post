import { Lock, Mail, Phone, MapPin } from 'lucide-react'
import GrapeIcon from './GrapeIcon'

function Footer({ setCurrentView, isOwner }) {
  function goTo(view) {
    setCurrentView(view)
  }

  return (
    <footer className="bg-[#2d2d2d] text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-[#2d2d2d] pb-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <GrapeIcon className="h-5 w-5 text-[#d4af37]" />
              <span className="font-serif-display text-lg italic text-[#d4af37]">
                TJ's Trading Post
              </span>
            </div>
            <p className="max-w-xs text-sm text-neutral-400">
              Your trusted marketplace for collectibles, antiques, treasures,
              and handmade craftsmanship.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm">
              <button
                type="button"
                onClick={() => goTo('home')}
                className="text-neutral-400 transition-colors hover:text-[#d4af37]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => goTo('marketplace')}
                className="text-neutral-400 transition-colors hover:text-[#d4af37]"
              >
                Browse Items
              </button>
              {isOwner && (
                <button
                  type="button"
                  onClick={() => goTo('list-item')}
                  className="text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  List Item
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
                <a
                  href="mailto:farrelltyler32@gmail.com"
                  className="text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  farrelltyler32@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
                <a
                  href="tel:+12283633068"
                  className="text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  (228) 363-3068
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#d4af37]" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Grenada%2C+MS"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  Grenada, MS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="flex items-center justify-center gap-2 pt-8 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} TJ's Trading Post. All rights reserved.
          <button
            type="button"
            onClick={() => goTo('list-item')}
            aria-label="Owner access"
            className="text-neutral-600 transition-colors hover:text-neutral-400"
          >
            <Lock className="h-3 w-3" />
          </button>
        </p>
      </div>
    </footer>
  )
}

export default Footer
