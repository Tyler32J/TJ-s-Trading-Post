import { formatPrice, typeBadgeClasses, typeLabel } from '../utils'

// The compact "list view" version of an item card: small photo on the left,
// details in the middle, price on the right. Quicker to scan on a phone.
function ItemListRow({ item, onSelect }) {
  let priceText = 'Looking to Buy'
  let priceClasses = 'text-purple-700 dark:text-purple-400'
  if (item.type === 'sell' && item.sold) {
    priceText = `Sold for ${formatPrice(item.price)}`
    priceClasses = 'text-neutral-500 dark:text-neutral-400'
  } else if (item.type === 'sell') {
    priceText = formatPrice(item.price)
    priceClasses = 'text-[#b8952a] dark:text-[#d4af37]'
  } else if (item.type === 'trade') {
    priceText = item.tradeFor ? `Trade for ${item.tradeFor}` : 'Trade only'
    priceClasses = 'text-blue-700 dark:text-blue-400'
  } else if (item.price) {
    priceText = `Budget ${formatPrice(item.price)}`
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 text-left transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
    >
      {item.image && (
        <img src={item.image} alt="" className="h-20 w-20 flex-shrink-0 rounded-lg object-cover" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-900 dark:text-white">{item.title}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${typeBadgeClasses(item.type)}`}>
            {typeLabel(item.type)}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
          {item.description}
        </p>
        <p className="mt-1 text-xs capitalize text-neutral-400">
          {item.category} · {item.condition}
        </p>
      </div>
      <span className={`flex-shrink-0 font-semibold ${priceClasses}`}>{priceText}</span>
    </button>
  )
}

export default ItemListRow
