import { DollarSign, Handshake, Repeat, Search } from 'lucide-react'
import FeatureBlock from './FeatureBlock'

function Hero({ setCurrentView, isOwner }) {
  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-serif-display text-5xl italic text-[#d4af37] sm:text-6xl">
          Trade, Sale, Buy, Collector
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Your trusted marketplace for collectibles, antiques, treasures, and
          handmade craftsmanship. Connect with collectors, traders, and other
          makers.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
              onClick={() => setCurrentView('list-item')}
              className="rounded-lg border-2 border-[#d4af37] px-6 py-3 font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
            >
              List Your Item
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
          icon={Handshake}
          title="Trusted Community"
          description="Connect with verified collectors and traders"
        />
      </div>
    </section>
  )
}

export default Hero
