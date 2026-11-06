import { useMemo, useState } from 'react'
import { LayoutGrid, List, Search, X } from 'lucide-react'
import ItemCard from '../components/ItemCard'
import ItemListRow from '../components/ItemListRow'
import SearchFilters from '../components/SearchFilters'
import Dropdown from '../components/Dropdown'
import WantedBoard from '../components/WantedBoard'
import FilterSidebar from '../components/FilterSidebar'
import MessagePanel from '../components/MessagePanel'
import { formatPrice, matchesPriceRange, typeLabel } from '../utils'

const SORT_OPTIONS = [
  // "Recommended" keeps the order you set with the ▲ ▼ arrows on the admin page.
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
]

// Items with no price (trades) always sort to the end.
function comparePrice(a, b, direction) {
  if (a.price == null && b.price == null) return 0
  if (a.price == null) return 1
  if (b.price == null) return -1
  return direction === 'low' ? a.price - b.price : b.price - a.price
}

function Marketplace({
  items,
  onSelectItem,
  initialSearch = '',
  initialType = 'all',
  recentItems = [],
  isSaved,
  onToggleSave,
  siteText,
}) {
  // initialSearch lets the home page search box hand its words over to this page.
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [typeFilter, setTypeFilter] = useState(initialType)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recommended')
  // 'grid' = photo cards, 'list' = compact rows
  const [layout, setLayout] = useState('grid')

  // How many listings are in each category, for the numbers on the category chips.
  // It counts every listing (not just the filtered ones), so the numbers stay put while browsing.
  const categoryCounts = useMemo(() => {
    const counts = { all: items.length }
    for (const item of items) {
      counts[item.category] = (counts[item.category] ?? 0) + 1
    }
    return counts
  }, [items])

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const matches = items.filter((item) => {
      // Search the title, description, and category, not just the title,
      // so "nintendo" finds the N64 even though the word is only in its description.
      const searchableText =
        `${item.title} ${item.description} ${item.category}`.toLowerCase()
      const matchesSearch = searchableText.includes(query)
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter
      const matchesPrice = matchesPriceRange(item, priceFilter)
      return matchesSearch && matchesType && matchesCategory && matchesPrice
    })

    // .filter() already made a new array, so sorting it won't touch the original items.
    return matches.sort((a, b) => {
      if (sortBy === 'price-low') return comparePrice(a, b, 'low')
      if (sortBy === 'price-high') return comparePrice(a, b, 'high')
      if (sortBy === 'newest') return b.datePosted.localeCompare(a.datePosted)
      return 0 // recommended: keep your order (JavaScript's sort leaves ties where they are)
    })
  }, [items, searchTerm, typeFilter, categoryFilter, priceFilter, sortBy])

  // Up to 4 items whose title, description, or category match what's typed,
  // for the suggestions that drop down under the search box.
  const suggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (query.length < 2) return []
    return items
      .filter((item) =>
        `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query)
      )
      .slice(0, 4)
  }, [items, searchTerm])

  // Categories that actually have listings, offered as "try one of these" when nothing matches.
  const categoriesWithItems = Object.keys(categoryCounts).filter(
    (category) => category !== 'all' && categoryCounts[category] > 0
  )

  function tryCategory(category) {
    setSearchTerm('')
    setTypeFilter('all')
    setPriceFilter('all')
    setCategoryFilter(category)
  }

  // Opening an item from here hands over the filtered list, so the popup's
  // Previous / Next only steps through the items currently showing.
  function openFromResults(item) {
    onSelectItem(item, filteredItems)
  }

  const hasActiveFilters =
    searchTerm !== '' ||
    typeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    priceFilter !== 'all'

  function clearFilters() {
    setSearchTerm('')
    setTypeFilter('all')
    setCategoryFilter('all')
    setPriceFilter('all')
  }

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-10 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl">
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
            suggestions={suggestions}
            onPickSuggestion={openFromResults}
          />
        </div>

        {/* Filters on the left, listings on the right (stacked on phones) */}
        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        <FilterSidebar
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categoryCounts={categoryCounts}
          hasActiveFilters={hasActiveFilters}
          onClear={clearFilters}
        />

        <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-[#b8952a] hover:underline dark:text-[#d4af37]"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              Sort:
              <Dropdown value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
            </div>
            {/* Grid / List switch */}
            <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
              {[
                { value: 'grid', label: 'Grid', Icon: LayoutGrid },
                { value: 'list', label: 'List', Icon: List },
              ].map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLayout(value)}
                  aria-pressed={layout === value}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    layout === value
                      ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredItems.length > 0 && layout === 'grid' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={openFromResults}
                isSaved={isSaved}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}

        {filteredItems.length > 0 && layout === 'list' && (
          <div className="flex flex-col gap-3">
            {filteredItems.map((item) => (
              <ItemListRow key={item.id} item={item} onSelect={openFromResults} />
            ))}
          </div>
        )}

        {/* Friendlier "no results": other things to try, plus a way to tell Tyler what they want */}
        {filteredItems.length === 0 && (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-3 text-center">
            <Search className="h-10 w-10 text-neutral-300 dark:text-neutral-600" />
            <h2 className="font-serif-display text-xl font-semibold text-neutral-900 dark:text-white">
              Nothing matches {searchTerm.trim() ? `“${searchTerm.trim()}”` : 'those filters'}
            </h2>

            {categoriesWithItems.length > 0 && (
              <>
                <p className="text-neutral-500 dark:text-neutral-400">Try one of these instead:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categoriesWithItems.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => tryCategory(category)}
                      className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 transition-colors hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-1 text-sm font-semibold text-[#b8952a] hover:underline dark:text-[#d4af37]"
              >
                Or show all items
              </button>
            )}

            <div className="mt-4 w-full text-left">
              <MessagePanel
                title="Still can’t find it? Tell Tyler what you’re looking for"
                message={`Hi Tyler, I'm looking for: ${
                  searchTerm.trim() || '___'
                }. Let me know if you come across one!`}
                subject="TJ's Trading Post: looking for something"
              />
            </div>
          </div>
        )}

        {/* Hidden while the "Wanted" filter is on, since those items are already showing above */}
        {typeFilter !== 'buy' && (
          <WantedBoard
            items={items}
            onSelectItem={onSelectItem}
            eyebrow={siteText?.wantedEyebrow}
            heading={siteText?.wantedHeading}
          />
        )}

        {recentItems.length > 0 && (
          <div className="mt-14 border-t border-neutral-200 pt-8 dark:border-neutral-700">
            <h2 className="font-serif-display text-xl font-semibold text-neutral-900 dark:text-white">
              Recently viewed
            </h2>
            {/* overflow-x-auto lets this row scroll sideways on a phone */}
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {recentItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="w-40 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white text-left transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
                >
                  {item.image && (
                    <img src={item.image} alt="" className="h-24 w-full object-cover" />
                  )}
                  <div className="p-2">
                    <span className="line-clamp-1 block text-sm font-medium text-neutral-800 dark:text-neutral-100">
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.type === 'sell' ? formatPrice(item.price) : typeLabel(item.type)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </section>
  )
}

export default Marketplace
