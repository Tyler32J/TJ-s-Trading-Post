import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white py-1.5 pl-4 pr-3 text-sm font-medium text-neutral-700 transition-colors hover:border-[#d4af37] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
      >
        {selectedLabel}
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="thin-scrollbar absolute left-0 z-20 mt-2 max-h-64 w-48 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  option.value === value
                    ? 'bg-[#d4af37]/10 font-semibold text-[#1a1a1a] dark:text-[#d4af37]'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {option.label}
                {option.value === value && <Check className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
