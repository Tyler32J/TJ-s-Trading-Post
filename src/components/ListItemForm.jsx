import { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../data'
import { typeLabel } from '../utils'

const TYPE_OPTIONS = ['sell', 'trade', 'buy']

function ListItemForm({ onSubmit, onCancel }) {
  const [type, setType] = useState('sell')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [condition, setCondition] = useState('good')
  const [username, setUsername] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({
      id: Date.now(),
      type,
      title,
      description,
      price: type === 'sell' ? Number(price) || 0 : null,
      category,
      condition,
      seller: username,
      datePosted: new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm dark:bg-neutral-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif-display text-2xl font-semibold text-neutral-900 dark:text-white">
          List an Item
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Listing Type
          </span>
          <div className="flex gap-2">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  type === option
                    ? 'bg-[#1a1a1a] text-[#d4af37]'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                }`}
              >
                {typeLabel(option)}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Title
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            placeholder="e.g. Vintage Baseball Card Collection"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Description
          <textarea
            required
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            placeholder="Describe your item's condition, history, and details"
          />
        </label>

        {type === 'sell' && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Price ($)
            <input
              type="number"
              min="0"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
              placeholder="0"
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Condition
          </span>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCondition(option)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  condition === option
                    ? 'bg-[#1a1a1a] text-[#d4af37]'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Your Username
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            placeholder="e.g. CardCollector99"
          />
        </label>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-[#1a1a1a] py-3 font-semibold text-white transition-colors hover:bg-[#2d2d2d]"
          >
            List Item
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border-2 border-neutral-300 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ListItemForm
