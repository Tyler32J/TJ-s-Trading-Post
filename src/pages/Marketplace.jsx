import { useMemo, useState } from 'react'
import ItemCard from '../components/ItemCard'
import SearchFilters from '../components/SearchFilters'

function Marketplace({ items, onSelectItem }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter
      return matchesSearch && matchesType && matchesCategory
    })
  }, [items, searchTerm, typeFilter, categoryFilter])

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-10 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif-display text-4xl font-semibold text-neutral-900 dark:text-white">
          Marketplace
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Browse all available items
        </p>

        <div className="mt-8">
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-neutral-500 dark:text-neutral-400">
            No items match your search.
          </p>
        )}
      </div>
    </section>
  )
}

export default Marketplace
