import { useState } from 'react'
import { DollarSign, Hammer, Repeat, Search } from 'lucide-react'
import FeatureBlock from './FeatureBlock'

function Hero({ setCurrentView, isOwner, onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    // Stop the browser's default form behavior (reloading the page).
    event.preventDefault()
    onSearch(query.trim())
  }

  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-serif-display text-5xl italic text-[#d4af37] sm:text-6xl">
          Trade, Sale, Buy, Collector
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Your trusted marketplace for collectibles, antiques, treasures, and
          handmade craftsmanship. New finds and fresh handmade pieces show up
          all the time.
        </p>

        {/* A <form> means pressing Enter searches too, not just clicking the button. */}
        <form
          onSubmit={handleSubmit}
          role="search"
          className="mx-auto mt-8 flex max-w-xl gap-2"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cards, vinyl, handmade…"
              aria-label="Search items"
              className="w-full rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] py-3 pl-12 pr-4 text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#d4af37] px-5 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentView('marketplace')}
            className="flex items-center gap-2 rounded-lg bg-[#d4af37] px-6 py-3 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
          >
            <Search className="h-5 w-5" />
            Browse Items
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={() => setCurrentView('admin')}
              className="rounded-lg border-2 border-[#d4af37] px-6 py-3 font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
            >
              Manage Listings
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-3">
        <FeatureBlock
          icon={DollarSign}
          title="Buy & Sell"
          description="Browse treasures for sale at great prices, or propose a trade"
        />
        <FeatureBlock
          icon={Repeat}
          title="Trade"
          description="Exchange items with other traders and collectors"
        />
        <FeatureBlock
          icon={Hammer}
          title="Built by hand"
          description="Wood and metal pieces made in my own shop"
        />
      </div>
    </section>
  )
}

export default Hero
