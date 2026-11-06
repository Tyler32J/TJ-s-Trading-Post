import { useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../data'

const TYPE_FILTERS = [
  { value: 'all', label: 'All Items' },
  { value: 'sell', label: 'For Sale' },
  { value: 'trade', label: 'For Trade' },
  { value: 'buy', label: 'Wanted' },
]

// The values here match the ranges in matchesPriceRange() in utils.js.
const PRICE_FILTERS = [
  { value: 'all', label: 'Any price' },
  { value: 'under-100', label: 'Under $100' },
  { value: '100-300', label: '$100–$300' },
  { value: 'over-300', label: '$300+' },
]

// One group of round "pick one" choices (a real radio group, so keyboards and
// screen readers know only one can be picked). The dot is drawn with CSS.
function RadioGroup({ name, title, options, value, onChange }) {
  return (
    <fieldset className="border-b border-neutral-200 pb-3 last:border-0 dark:border-neutral-800">
      <legend className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
        {title}
      </legend>
      {options.map((option) => {
        const selected = value === option.value
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#d4af37] ${
              selected
                ? 'font-semibold text-neutral-900 dark:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? 'border-[#d4af37]' : 'border-neutral-300 dark:border-neutral-600'
              }`}
            >
              {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />}
            </span>
            <span className="flex-1">{option.label}</span>
            {option.count != null && <span className="text-xs text-neutral-400">{option.count}</span>}
          </label>
        )
      })}
    </fieldset>
  )
}

// The filter column on the left of the Browse page. On phones and small tablets it
// starts closed behind a "Filters" button, so the items aren't pushed far down.
function FilterSidebar({
  typeFilter,
  setTypeFilter,
  priceFilter,
  setPriceFilter,
  categoryFilter,
  setCategoryFilter,
  categoryCounts,
  hasActiveFilters,
  onClear,
}) {
  const [openOnPhone, setOpenOnPhone] = useState(false)

  // Only categories that have listings (plus the one picked, so it never vanishes while selected).
  const categoryOptions = [
    { value: 'all', label: 'All', count: categoryCounts.all ?? 0 },
    ...CATEGORIES.filter((c) => (categoryCounts[c] ?? 0) > 0 || c === categoryFilter).map((c) => ({
      value: c,
      label: c,
      count: categoryCounts[c] ?? 0,
    })),
  ]
  const activeCount =
    (typeFilter !== 'all') + (priceFilter !== 'all') + (categoryFilter !== 'all')

  return (
    <aside className="lg:sticky lg:top-24">
      {/* Phones / small screens: one button that opens the filters */}
      <button
        type="button"
        onClick={() => setOpenOnPhone((open) => !open)}
        aria-expanded={openOnPhone}
        aria-controls="browse-filters"
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 lg:hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-[#d4af37] px-1.5 text-xs font-bold text-[#1a1a1a]">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${openOnPhone ? 'rotate-180' : ''}`} />
      </button>

      <div
        id="browse-filters"
        className={`${openOnPhone ? 'mt-3 flex' : 'hidden'} flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-3 lg:mt-0 lg:flex dark:border-neutral-800 dark:bg-neutral-900`}
      >
        <RadioGroup name="type" title="Type" options={TYPE_FILTERS} value={typeFilter} onChange={setTypeFilter} />
        <RadioGroup name="price" title="Price" options={PRICE_FILTERS} value={priceFilter} onChange={setPriceFilter} />
        <RadioGroup
          name="category"
          title="Category"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="mx-2 mb-1 rounded-lg border border-neutral-300 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
          >
            Clear filters
          </button>
        )}
      </div>
    </aside>
  )
}

export default FilterSidebar
