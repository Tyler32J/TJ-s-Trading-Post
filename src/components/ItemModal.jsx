import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, Info, Maximize2, Repeat, Share2, Tag, X } from 'lucide-react'
import {
  formatDate,
  formatPrice,
  hasPriceDrop,
  typeBadgeClasses,
  typeLabel,
} from '../utils'
import { CONDITION_INFO, CONTACT } from '../data'
import MessagePanel from './MessagePanel'
import PhotoLightbox from './PhotoLightbox'

// isSaved / toggleSaved come from App.jsx, so the header's "Saved" count
// updates the moment you tap the heart here.
function ItemModal({
  item,
  onClose,
  isSaved,
  toggleSaved,
  allItems = [],
  onSelectItem,
  browseList = [],
}) {
  // Which panel is open under the buttons: 'contact', 'offer', 'trade', or null.
  const [openPanel, setOpenPanel] = useState(null)
  const [offerAmount, setOfferAmount] = useState('')
  const [tradeOffer, setTradeOffer] = useState('')
  const [showConditionGuide, setShowConditionGuide] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // While the popup is open: Esc closes it, and the page behind it can't scroll.
  // The function returned at the end is React's "cleanup". It runs when the
  // popup closes and puts everything back the way it was.
  useEffect(() => {
    if (!item) return

    function handleKeyDown(event) {
      // ← / → flip to the previous / next item, unless someone is typing in a box
      // (like the offer amount), where the arrow keys should move the cursor instead.
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !lightboxOpen && !typing) {
        const index = browseList.findIndex((other) => other.id === item.id)
        if (index === -1 || browseList.length < 2) return
        const step = event.key === 'ArrowRight' ? 1 : -1
        // The % (remainder) makes it wrap around: Next on the last item goes to the first.
        onSelectItem(browseList[(index + step + browseList.length) % browseList.length], browseList)
        return
      }

      if (event.key !== 'Escape') return
      // If the full-screen photo is open, Esc closes just that first.
      if (lightboxOpen) setLightboxOpen(false)
      else onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [item, onClose, lightboxOpen, browseList, onSelectItem])

  if (!item) return null

  // An item can have a list of photos (item.images) or just one (item.image).
  // Thumbnails only show up when there's more than one.
  const photos = item.images?.length ? item.images : [item.image].filter(Boolean)
  const currentPhoto = photos[photoIndex] ?? photos[0]

  const saved = isSaved(item.id)
  const subject = `TJ's Trading Post: ${item.title}`
  const priceText = item.price ? ` (${formatPrice(item.price)})` : ''
  const contactMessage =
    item.type === 'buy'
      ? `Hi Tyler, I saw you're looking for: ${item.title}. I might have one.`
      : `Hi Tyler, is the ${item.title}${priceText} still available?`
  const offerMessage = `Hi Tyler, would you take ${
    offerAmount ? `$${offerAmount}` : '$___'
  } for the ${item.title}?`
  const tradeMessage = `Hi Tyler, I'd like to trade for your ${item.title}. I have: ${
    tradeOffer.trim() || '___'
  }`

  // "You might also like": same category first, then same type (sale/trade/wanted),
  // then anything else, so there are always up to 3 suggestions.
  const others = allItems.filter((other) => other.id !== item.id)
  const similarItems = [
    ...others.filter((o) => o.category === item.category),
    ...others.filter((o) => o.category !== item.category && o.type === item.type),
    ...others.filter((o) => o.category !== item.category && o.type !== item.type),
  ].slice(0, 3)

  // Where this item sits in the list it was opened from, for Previous / Next.
  const navIndex = browseList.findIndex((other) => other.id === item.id)
  const canStep = navIndex !== -1 && browseList.length > 1 && onSelectItem
  const prevItem = canStep ? browseList[(navIndex - 1 + browseList.length) % browseList.length] : null
  const nextItem = canStep ? browseList[(navIndex + 1) % browseList.length] : null

  function togglePanel(name) {
    setOpenPanel((current) => (current === name ? null : name))
  }

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

        {currentPhoto && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Enlarge photo"
            className="relative block h-56 w-full cursor-zoom-in overflow-hidden rounded-t-2xl"
          >
            <img src={currentPhoto} alt={item.title} className="h-full w-full object-cover" />
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              <Maximize2 className="h-3.5 w-3.5" />
              Tap to enlarge
            </span>
            {photos.length > 1 && (
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium tabular-nums text-white">
                {photos.indexOf(currentPhoto) + 1} / {photos.length}
              </span>
            )}
          </button>
        )}

        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pt-3">
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setPhotoIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === photoIndex}
                className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                  index === photoIndex ? 'border-[#d4af37]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col p-6">
          {canStep && (
            <div className="mb-4 flex items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={() => onSelectItem(prevItem, browseList)}
                className="flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 transition-colors hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-neutral-400 tabular-nums">
                {navIndex + 1} of {browseList.length}
              </span>
              <button
                type="button"
                onClick={() => onSelectItem(nextItem, browseList)}
                className="flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 transition-colors hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pr-10">
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClasses(item.type)}`}
            >
              {typeLabel(item.type)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleSaved(item.id)}
                aria-pressed={saved}
                className={`rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  saved ? 'text-[#d4af37]' : 'text-neutral-500 dark:text-neutral-300'
                }`}
                aria-label={saved ? 'Remove from saved' : 'Save item'}
              >
                <Heart className="h-5 w-5" fill={saved ? 'currentColor' : 'none'} />
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
            <p className="mt-2 flex flex-wrap items-baseline gap-2">
              {hasPriceDrop(item) && (
                <span className="text-lg text-neutral-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-semibold text-[#d4af37]">
                {formatPrice(item.price)}
              </span>
              {hasPriceDrop(item) && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  Price drop
                </span>
              )}
            </p>
          )}
          {item.sold && (
            <p className="mt-2 w-fit rounded-lg bg-[#d4af37]/15 px-3 py-1.5 text-sm font-semibold text-[#8a6d17] dark:text-[#e0c04d]">
              This one has sold. Message me if you're looking for something like it.
            </p>
          )}
          {item.type === 'trade' && (
            <p className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
              {item.tradeFor ? `Will trade for: ${item.tradeFor}` : 'Trade Only'}
            </p>
          )}
          {item.type === 'buy' && (
            <p className="mt-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              {item.price ? `Budget: ${formatPrice(item.price)}` : 'Looking to Buy'}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="capitalize">Condition: {item.condition}</span>
            <button
              type="button"
              onClick={() => setShowConditionGuide((open) => !open)}
              aria-expanded={showConditionGuide}
              className="flex items-center gap-1 text-[#b8952a] hover:underline dark:text-[#d4af37]"
            >
              <Info className="h-3.5 w-3.5" />
              What does this mean?
            </button>
            <span>Posted {formatDate(item.datePosted)}</span>
          </div>

          {showConditionGuide && (
            <div className="mt-2 grid gap-1.5 rounded-lg bg-neutral-100 p-3 text-sm dark:bg-neutral-900">
              {Object.entries(CONDITION_INFO).map(([grade, meaning]) => (
                <p
                  key={grade}
                  className={
                    grade === item.condition
                      ? 'font-semibold text-neutral-900 dark:text-white'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }
                >
                  <span className="capitalize">{grade}</span>: {meaning}
                </p>
              ))}
            </div>
          )}

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Category:{' '}
            <span className="text-neutral-700 dark:text-neutral-300">{item.category}</span>
          </p>

          <p className="mt-4 text-neutral-600 dark:text-neutral-300">{item.description}</p>

          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Seller:{' '}
            <span className="text-neutral-700 dark:text-neutral-300">{item.seller}</span>
          </p>

          <button
            type="button"
            onClick={() => togglePanel('contact')}
            aria-expanded={openPanel === 'contact'}
            className="mt-6 rounded-lg bg-[#1a1a1a] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#2d2d2d]"
          >
            Contact Seller
          </button>

          {item.type === 'sell' && !item.sold && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950/40 dark:text-green-300">
              <Tag className="h-4 w-4 flex-shrink-0" />
              Buying 2 or more? Ask about a bundle price.
            </div>
          )}

          {item.type === 'sell' && !item.sold && (
            <button
              type="button"
              onClick={() => togglePanel('offer')}
              aria-expanded={openPanel === 'offer'}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border-2 border-[#d4af37] px-6 py-2.5 font-semibold text-[#8a6d17] transition-colors hover:bg-[#d4af37]/10 dark:text-[#d4af37]"
            >
              <Tag className="h-4 w-4" />
              Make an offer
            </button>
          )}

          {item.type === 'trade' && (
            <button
              type="button"
              onClick={() => togglePanel('trade')}
              aria-expanded={openPanel === 'trade'}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border-2 border-blue-500 px-6 py-2.5 font-semibold text-blue-700 transition-colors hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              <Repeat className="h-4 w-4" />
              Offer a trade
            </button>
          )}

          {openPanel === 'contact' && (
            <MessagePanel
              title="Message Tyler about this item"
              message={contactMessage}
              subject={subject}
              note={`Or call ${CONTACT.phoneDisplay}`}
            />
          )}

          {openPanel === 'offer' && (
            <MessagePanel title="Your offer" message={offerMessage} subject={subject}>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-semibold text-neutral-500">$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={offerAmount}
                  onChange={(event) => setOfferAmount(event.target.value)}
                  placeholder={String(Math.round(item.price * 0.85))}
                  aria-label="Offer amount in dollars"
                  className="w-32 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-lg text-neutral-800 focus:border-[#d4af37] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                />
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Asking {formatPrice(item.price)}
                </span>
              </div>
            </MessagePanel>
          )}

          {openPanel === 'trade' && (
            <MessagePanel
              title="What would you trade?"
              message={tradeMessage}
              subject={subject}
              note="Tip: after the message opens, attach a photo of your item in your texting or email app."
            >
              <textarea
                rows={2}
                value={tradeOffer}
                onChange={(event) => setTradeOffer(event.target.value)}
                placeholder="e.g. 12 Batman comics from the 90s"
                aria-label="What you would trade"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:border-[#d4af37] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              />
            </MessagePanel>
          )}

          {similarItems.length > 0 && onSelectItem && (
            <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-700">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                You might also like
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {similarItems.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    // Opening another item swaps the popup's `key` in App.jsx,
                    // so it starts fresh (panels closed, photo reset).
                    onClick={() => onSelectItem(other)}
                    className="overflow-hidden rounded-lg border border-neutral-200 text-left transition-colors hover:border-[#d4af37] dark:border-neutral-700"
                  >
                    {other.image && (
                      <img src={other.image} alt="" className="h-20 w-full object-cover" />
                    )}
                    <div className="p-1.5">
                      <span className="line-clamp-1 block text-xs font-medium text-neutral-800 dark:text-neutral-100">
                        {other.title}
                      </span>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {other.type === 'sell' ? formatPrice(other.price) : typeLabel(other.type)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <PhotoLightbox
          src={currentPhoto}
          alt={item.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}

export default ItemModal
