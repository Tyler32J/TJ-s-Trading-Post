import { Heart } from 'lucide-react'
import ItemCard from '../components/ItemCard'

function Saved({ items, savedIds, onSelectItem, setCurrentView, isSaved, onToggleSave }) {
  // Only show saved items that still exist (listings reset on refresh until the database step).
  const savedItems = items.filter((item) => savedIds.includes(item.id))

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-10 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif-display text-4xl font-semibold text-neutral-900 dark:text-white">
          Saved Items
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Things you've hearted. They're kept on this device.
        </p>

        {savedItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                isSaved={isSaved}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center text-neutral-500 dark:text-neutral-400">
            <Heart className="h-10 w-10 text-neutral-300 dark:text-neutral-600" />
            <p>Nothing saved yet. Tap the heart on any item to keep it here.</p>
            <button
              type="button"
              onClick={() => setCurrentView('marketplace')}
              className="rounded-lg bg-[#1a1a1a] px-5 py-2 text-sm font-semibold text-[#d4af37] hover:bg-[#2d2d2d]"
            >
              Browse items
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Saved
