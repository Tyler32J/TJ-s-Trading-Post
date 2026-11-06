import { Camera, DollarSign, Heart, MapPin, Repeat, Search } from 'lucide-react'
import { formatPrice, hasPriceDrop, isRecent, typeBadgeClasses, typeLabel } from '../utils'
import ConditionStars from './ConditionStars'

// isSaved / onToggleSave are optional. When they're passed in, a heart shows on the photo
// so visitors can save an item without opening it.
function ItemCard({ item, onSelect, isSaved, onToggleSave }) {
  const saved = isSaved ? isSaved(item.id) : false

  return (
    // The heart can't go inside the card's <button> (a button inside a button isn't
    // allowed), so this wrapper holds both: the card, plus the heart layered on top.
    <div className="group relative flex">
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
    >
      {item.image && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              item.sold ? 'brightness-90' : ''
            }`}
          />
          {/* "📷 4" when the listing has more than one photo */}
          {item.images?.length > 1 && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-xs font-medium text-white">
              <Camera className="h-3.5 w-3.5" />
              {item.images.length}
            </span>
          )}
          {/* Sold items keep their spot with the gold corner sash (marked from the admin page) */}
          {item.sold && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-[62px] top-9 w-[250px] rotate-45 bg-gradient-to-r from-[#b8952a] via-[#e9cc6a] to-[#b8952a] py-2.5 text-center text-[17px] font-bold uppercase tracking-[0.32em] text-[#1a1a1a] shadow-lg">
                Sold
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          {item.sold ? (
            <span className="whitespace-nowrap rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-semibold text-[#8a6d17] dark:text-[#e0c04d]">
              Sold
            </span>
          ) : (
            <span
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClasses(item.type)}`}
            >
              {item.type === 'trade' && <Repeat className="h-3.5 w-3.5" />}
              {item.type === 'sell' && <DollarSign className="h-3.5 w-3.5" />}
              {item.type === 'buy' && <Search className="h-3.5 w-3.5" />}
              {typeLabel(item.type)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          {item.type === 'sell' && item.sold && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Sold for{' '}
              <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                {formatPrice(item.price)}
              </span>
            </span>
          )}
          {item.type === 'sell' && !item.sold && (
            <span className="flex flex-wrap items-baseline gap-2">
              {hasPriceDrop(item) && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
              <span className="whitespace-nowrap font-semibold text-[#d4af37]">
                {formatPrice(item.price)}
              </span>
              {hasPriceDrop(item) && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                  Price drop
                </span>
              )}
            </span>
          )}
          {item.type === 'trade' && (
            <span className="line-clamp-1 text-sm font-medium text-blue-700 dark:text-blue-400">
              {item.tradeFor ? `Trade for: ${item.tradeFor}` : 'Trade Only'}
            </span>
          )}
          {item.type === 'buy' && (
            <span className="whitespace-nowrap text-sm font-medium text-purple-700 dark:text-purple-400">
              {item.price ? `Budget: ${formatPrice(item.price)}` : 'Looking to Buy'}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          {/* Every listing is Tyler's, so show something more useful than the seller name */}
          {isRecent(item.datePosted) ? (
            <span className="font-semibold text-[#b8952a] dark:text-[#d4af37]">
              Just listed
            </span>
          ) : (
            <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
              <MapPin className="h-3.5 w-3.5" />
              Local pickup
            </span>
          )}
          <ConditionStars condition={item.condition} />
        </div>
      </div>
    </button>

    {onToggleSave && (
      <button
        type="button"
        onClick={() => onToggleSave(item.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-110 ${
          saved ? 'text-[#d4af37]' : 'text-neutral-600'
        }`}
      >
        <Heart className="h-5 w-5" fill={saved ? 'currentColor' : 'none'} />
      </button>
    )}
    </div>
  )
}

export default ItemCard
