import { useState } from 'react'
import { Search } from 'lucide-react'
import { formatPrice, typeLabel } from '../utils'

// The Browse page's search box, with suggestions that drop down as you type.
// (The Type / Price / Category filters live in FilterSidebar.jsx.)
function SearchFilters({
  searchTerm,
  setSearchTerm,
  suggestions = [],
  onPickSuggestion,
}) {
  // Whether the suggestion list is open, and which row the arrow keys are on (-1 = none).
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const open = showSuggestions && searchTerm.trim().length >= 2 && onPickSuggestion

  function pick(item) {
    setShowSuggestions(false)
    setActiveIndex(-1)
    onPickSuggestion(item)
  }

  // ↓ / ↑ move through the suggestions, Enter opens the highlighted one, Esc closes the list.
  function handleKeyDown(event) {
    if (!open) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (event.key === 'Enter' && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault()
      pick(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
            setShowSuggestions(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={Boolean(open)}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          placeholder="Search items..."
          className="w-full rounded-lg border border-neutral-300 bg-white py-3 pl-12 pr-4 text-neutral-700 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
        />

        {open && (
          <ul
            id="search-suggestions"
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
          >
            {suggestions.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                No matches yet. Keep typing.
              </li>
            )}
            {suggestions.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  // preventDefault on mouse-down keeps the search box focused,
                  // so the list doesn't close before the click lands.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left ${
                    index === activeIndex ? 'bg-neutral-100 dark:bg-neutral-700' : ''
                  }`}
                >
                  {item.image && (
                    <img src={item.image} alt="" className="h-10 w-10 flex-shrink-0 rounded object-cover" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-neutral-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.category}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm font-semibold text-[#b8952a] dark:text-[#d4af37]">
                    {item.type === 'sell' ? formatPrice(item.price) : typeLabel(item.type)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default SearchFilters
