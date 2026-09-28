import { Heart, Share2, X } from 'lucide-react'
import { formatDate, formatPrice, typeBadgeClasses, typeLabel } from '../utils'

function ItemModal({ item, onClose }) {
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-neutral-800"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-neutral-700 shadow hover:bg-white dark:bg-neutral-700/90 dark:text-neutral-200 dark:hover:bg-neutral-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {item.image && (
          <div className="h-56 w-full overflow-hidden rounded-t-2xl">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between gap-2 pr-10">
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClasses(item.type)}`}
            >
              {typeLabel(item.type)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                aria-label="Save item"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                aria-label="Share item"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <h2 className="font-serif-display mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h2>

          {item.type === 'sell' && (
            <p className="mt-2 text-2xl font-semibold text-[#d4af37]">
              {formatPrice(item.price)}
            </p>
          )}
          {item.type === 'trade' && (
            <p className="mt-2 text-lg font-semibold text-blue-700">
              Trade Only
            </p>
          )}
          {item.type === 'buy' && (
            <p className="mt-2 text-lg font-semibold text-purple-700">
              {item.price ? `Budget: ${formatPrice(item.price)}` : 'Looking to Buy'}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="capitalize">Condition: {item.condition}</span>
            <span>Posted {formatDate(item.datePosted)}</span>
          </div>

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Category:{' '}
            <span className="text-neutral-700 dark:text-neutral-300">
              {item.category}
            </span>
          </p>

          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            {item.description}
          </p>

          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Seller:{' '}
            <span className="text-neutral-700 dark:text-neutral-300">
              {item.seller}
            </span>
          </p>

          <button
            type="button"
            className="mt-6 rounded-lg bg-[#1a1a1a] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#2d2d2d]"
          >
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
