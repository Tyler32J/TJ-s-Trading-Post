import Hero from '../components/Hero'
import ItemCard from '../components/ItemCard'

function Home({ items, setCurrentView, onSelectItem, isOwner }) {
  const featuredItems = items.slice(0, 3)

  return (
    <>
      <Hero setCurrentView={setCurrentView} isOwner={isOwner} />

      <section className="bg-neutral-50 px-6 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif-display text-3xl font-semibold text-neutral-900 dark:text-white">
            Featured Items
          </h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Check out our latest listings
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setCurrentView('marketplace')}
              className="rounded-lg bg-[#1a1a1a] px-6 py-3 font-semibold text-[#d4af37] transition-colors hover:bg-[#2d2d2d]"
            >
              View All Items
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
