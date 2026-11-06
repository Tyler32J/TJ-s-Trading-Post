import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { formatPrice, typeLabel } from '../utils'

// The quick-search panel that drops down under the header when the magnifying
// glass is tapped. Works from any page: results show as you type.
//   ↑ / ↓  move through the results
//   Enter  opens the highlighted item, or shows every match on the Browse page
//   Esc    closes the panel
function NavSearch({ items, onSelectItem, onSeeAll, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const panelRef = useRef(null)

  const trimmed = query.trim()
  const results =
    trimmed.length < 2
      ? []
      : items
          .filter((item) =>
            `${item.title} ${item.description} ${item.category}`
              .toLowerCase()
              .includes(trimmed.toLowerCase())
          )
          .slice(0, 5)

  // Close when Esc is pressed or when someone clicks anywhere outside the panel.
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    function handleClickOutside(event) {
      // The header's search button toggles the panel itself, so ignore clicks on it here.
      if (event.target.closest('[data-nav-search-toggle]')) return
      if (panelRef.current && !panelRef.current.contains(event.target)) onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  function openResult(item) {
    onSelectItem(item)
    onClose()
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (activeIndex >= 0 && results[activeIndex]) {
      openResult(results[activeIndex])
    } else if (trimmed) {
      onSeeAll(trimmed)
      onClose()
    }
  }

  return (
    <div
      ref={panelRef}
      className="border-t border-white/10 bg-white px-6 py-4 shadow-lg dark:bg-neutral-900"
    >
      <form onSubmit={handleSubmit} role="search" className="mx-auto max-w-2xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(-1)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search everything…"
            aria-label="Search all items"
            className="w-full rounded-lg border border-neutral-300 bg-white py-3 pl-12 pr-4 text-neutral-800 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
          />
        </div>

        <div className="mt-2">
          {trimmed.length < 2 && (
            <p className="px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400">
              Type at least 2 letters.
            </p>
          )}

          {trimmed.length >= 2 && results.length === 0 && (
            <p className="px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400">
              No matches for “{trimmed}”.
            </p>
          )}

          {results.length > 0 && (
            <ul role="listbox" aria-label="Search results">
              {results.map((item, index) => (
                <li key={item.id} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    onClick={() => openResult(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left ${
                      index === activeIndex ? 'bg-neutral-100 dark:bg-neutral-800' : ''
                    }`}
                  >
                    {item.image ? (
                      <img src={item.image} alt="" className="h-10 w-10 flex-shrink-0 rounded object-cover" />
                    ) : (
                      <span className="h-10 w-10 flex-shrink-0 rounded bg-neutral-200 dark:bg-neutral-700" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-neutral-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.category}</span>
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-[#b8952a] dark:text-[#d4af37]">
                      {item.sold ? 'Sold' : item.type === 'sell' ? formatPrice(item.price) : typeLabel(item.type)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {trimmed && (
            <button
              type="submit"
              className="mt-2 px-2 text-sm font-semibold text-[#b8952a] hover:underline dark:text-[#d4af37]"
            >
              See all results for “{trimmed}” →
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default NavSearch
