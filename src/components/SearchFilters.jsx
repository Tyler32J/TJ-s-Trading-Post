import { Filter, Search } from 'lucide-react'
import Dropdown from './Dropdown'
import { CATEGORIES } from '../data'

const TYPE_FILTERS = [
  { value: 'all', label: 'All Items' },
  { value: 'sell', label: 'For Sale' },
  { value: 'trade', label: 'For Trade' },
  { value: 'buy', label: 'Wanted' },
]

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  ...CATEGORIES.map((category) => ({ value: category, label: category })),
]

function SearchFilters({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -tranneutral-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search items..."
          className="w-full rounded-lg border border-neutral-300 bg-white py-3 pl-12 pr-4 text-neutral-700 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          <Filter className="h-4 w-4" />
          Type:
        </span>
        {TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setTypeFilter(filter.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              typeFilter === filter.value
                ? 'bg-[#1a1a1a] text-[#d4af37]'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">Category:</span>
        <Dropdown value={categoryFilter} onChange={setCategoryFilter} options={CATEGORY_OPTIONS} />
      </div>
    </div>
  )
}

export default SearchFilters
