import { DollarSign, Repeat, Search } from 'lucide-react'
import { formatPrice, typeBadgeClasses, typeLabel } from '../utils'

function ItemCard({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
    >
      {item.image && (
        <div className="h-56 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          <span
            className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClasses(item.type)}`}
          >
            {item.type === 'trade' && <Repeat className="h-3.5 w-3.5" />}
            {item.type === 'sell' && <DollarSign className="h-3.5 w-3.5" />}
            {item.type === 'buy' && <Search className="h-3.5 w-3.5" />}
            {typeLabel(item.type)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {item.type === 'sell' && (
            <span className="whitespace-nowrap font-semibold text-[#d4af37]">
              {formatPrice(item.price)}
            </span>
          )}
          {item.type === 'trade' && (
            <span className="whitespace-nowrap text-sm font-medium text-blue-700">
              Trade Only
            </span>
          )}
          {item.type === 'buy' && (
            <span className="whitespace-nowrap text-sm font-medium text-purple-700">
              {item.price ? `Budget: ${formatPrice(item.price)}` : 'Looking to Buy'}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">
            by {item.seller}
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            {item.condition}
          </span>
        </div>
      </div>
    </button>
  )
}

export default ItemCard
