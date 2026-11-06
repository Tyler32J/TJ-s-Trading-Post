import { formatPrice } from '../utils'
import { DEFAULT_SITE_TEXT } from '../useSiteText'

// "Have one of these? I'll buy it." Shown under the Browse listings.
// It reads your Wanted (type: 'buy') listings, so it updates by itself
// whenever you post or remove one.
// The two lines of wording can be changed on the admin page (Wanted tab → Edit wording).
function WantedBoard({ items, onSelectItem, eyebrow = DEFAULT_SITE_TEXT.wantedEyebrow, heading = DEFAULT_SITE_TEXT.wantedHeading }) {
  const wantedItems = items.filter((item) => item.type === 'buy')

  if (wantedItems.length === 0) return null

  return (
    <div className="mt-14 rounded-2xl border border-purple-200 bg-white p-6 dark:border-purple-900 dark:bg-neutral-950">
      <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-400">
        {eyebrow}
      </p>
      <h2 className="font-serif-display mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">
        {heading}
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {wantedItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectItem(item)}
            className="flex items-center gap-4 rounded-xl border border-dashed border-purple-300 bg-purple-50/60 p-3 text-left transition-colors hover:border-purple-500 dark:border-purple-800 dark:bg-purple-950/30"
          >
            {item.image && (
              <img
                src={item.image}
                alt=""
                className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
              />
            )}
            {/* min-w-0 lets long titles shrink instead of pushing the row wider */}
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </span>
              <span className="line-clamp-1 block text-sm text-neutral-500 dark:text-neutral-400">
                {item.description}
              </span>
            </span>
            <span className="flex flex-shrink-0 flex-col items-end gap-1">
              {item.price && (
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                  Up to {formatPrice(item.price)}
                </span>
              )}
              <span className="rounded-lg bg-[#1a1a1a] px-3 py-1.5 text-xs font-semibold text-[#d4af37]">
                I have one →
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default WantedBoard
