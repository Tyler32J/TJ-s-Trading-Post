import { useState } from 'react'
import { Camera, DollarSign, Repeat, Search, Star, X } from 'lucide-react'
import Dropdown from './Dropdown'
import { CATEGORIES } from '../data'
import { resizeImage } from '../imageTools'

const inputClasses =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
const labelClasses = 'grid gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200'

// Each photo is shrunk to about 100 KB, and the browser only has about 5 MB of room,
// so listings are capped at 6 photos.
const MAX_PHOTOS = 6

const TYPES = [
  { value: 'sell', label: 'For Sale', Icon: DollarSign },
  { value: 'trade', label: 'For Trade', Icon: Repeat },
  { value: 'buy', label: 'Wanted', Icon: Search },
]
// Stars match the gold stars shown on the item cards (out of 5).
const CONDITIONS = [
  { value: 'new', label: 'New', stars: 5 },
  { value: 'like-new', label: 'Like new', stars: 4 },
  { value: 'good', label: 'Good', stars: 3 },
  { value: 'fair', label: 'Fair', stars: 2 },
]
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }))

// Shared look for the tappable choice buttons (selected = black with gold text).
const choiceClasses = (selected) =>
  `flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] ${
    selected
      ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#d4af37] dark:border-[#d4af37]'
      : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200'
  }`

// The add / edit form on the admin page. `item` is the listing being edited,
// or null when adding a new one.
function AdminListingForm({ item, onSave, onCancel, defaultType = 'sell' }) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [type, setType] = useState(item?.type ?? defaultType)
  const [tradeFor, setTradeFor] = useState(item?.tradeFor ?? '')
  const [price, setPrice] = useState(item?.price ?? '')
  const [category, setCategory] = useState(item?.category ?? 'Handmade')
  const [condition, setCondition] = useState(item?.condition ?? 'new')
  const [featured, setFeatured] = useState(item?.featured ?? false)
  // All the listing's photos. The first one is the "cover" that shows on the card.
  const [photos, setPhotos] = useState(() => item?.images ?? (item?.image ? [item.image] : []))
  const [photoBusy, setPhotoBusy] = useState(false)
  const [error, setError] = useState('')

  async function handlePhotos(event) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = '' // so picking the same photo again still works
    if (files.length === 0) return

    const room = MAX_PHOTOS - photos.length
    if (room <= 0) {
      setError(`That's the most photos for one listing (${MAX_PHOTOS}). Remove one to add another.`)
      return
    }

    setPhotoBusy(true)
    setError(files.length > room ? `Only the first ${room} were added: listings hold up to ${MAX_PHOTOS} photos.` : '')
    try {
      const added = []
      for (const file of files.slice(0, room)) {
        added.push(await resizeImage(file))
      }
      setPhotos((current) => [...current, ...added])
    } catch (err) {
      setError(err.message)
    } finally {
      setPhotoBusy(false)
    }
  }

  function removePhoto(index) {
    setPhotos((current) => current.filter((_, i) => i !== index))
  }

  // Moves a photo to the front, which makes it the cover.
  function makeCover(index) {
    setPhotos((current) => [current[index], ...current.filter((_, i) => i !== index)])
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Give the listing a title first.')
      return
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      type,
      // Trades have no price. A blank price is saved as "no price".
      price: type === 'trade' || price === '' ? null : Number(price),
      // Only trade listings keep a "what I'd trade it for" note.
      tradeFor: type === 'trade' ? tradeFor.trim() : '',
      category,
      condition,
      featured,
      image: photos[0] ?? null, // the cover photo, used on cards
      images: photos, // every photo, for the gallery in the item popup
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-2xl border border-[#d4af37]/50 bg-white p-6 shadow-sm dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-xl font-semibold text-neutral-900 dark:text-white">
          {item ? 'Edit listing' : 'Add a listing'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <div>
          {/* The cover: the big one, shown on the item's card */}
          <div className="relative flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800">
            {photos[0] ? (
              <>
                <img src={photos[0]} alt="Cover photo" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-[#1a1a1a]/85 px-2 py-0.5 text-[11px] font-semibold text-[#d4af37]">
                  Cover
                </span>
              </>
            ) : (
              <span className="px-2 text-center text-xs text-neutral-400">
                {photoBusy ? 'Loading photos…' : 'No photos yet'}
              </span>
            )}
          </div>

          {/* Every photo, with remove and "make cover" buttons */}
          {photos.length > 0 && (
            <ul className="mt-2 grid max-w-[220px] grid-cols-3 gap-2">
              {photos.map((src, index) => (
                <li key={src.slice(-40) + index} className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <img src={src} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    aria-label={`Remove photo ${index + 1}`}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => makeCover(index)}
                      aria-label={`Make photo ${index + 1} the cover`}
                      title="Make cover"
                      className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-[#d4af37] hover:bg-[#1a1a1a]"
                    >
                      <Star className="h-3 w-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <label
            className={`mt-2 flex w-full max-w-[220px] items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2 text-sm font-medium text-neutral-700 focus-within:ring-2 focus-within:ring-[#d4af37] dark:border-neutral-600 dark:text-neutral-200 ${
              photos.length >= MAX_PHOTOS ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-[#d4af37]'
            }`}
          >
            <Camera className="h-4 w-4" />
            {photoBusy ? 'Adding…' : photos.length ? `Add more (${photos.length}/${MAX_PHOTOS})` : 'Add photos'}
            {/* "multiple" lets you pick several photos at once */}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={photoBusy || photos.length >= MAX_PHOTOS}
              onChange={handlePhotos}
              className="sr-only"
            />
          </label>
          {photos.length > 1 && (
            <p className="mt-1 max-w-[220px] text-xs text-neutral-500 dark:text-neutral-400">
              Tap ★ on a photo to make it the cover.
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <label className={labelClasses}>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Walnut cutting board"
              className={inputClasses}
            />
          </label>
          <label className={labelClasses}>
            Description
            <textarea
              rows={2}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={inputClasses}
            />
          </label>
          {/* Listing type: three buttons instead of a drop-down */}
          <fieldset className="grid gap-1">
            <legend className="mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">Listing type</legend>
            <div className="grid grid-cols-3 gap-2">
              {TYPES.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={type === value}
                  onClick={() => setType(value)}
                  // On phones the icon sits above the word so "For Sale" / "For Trade" fit on one line
                  className={`${choiceClasses(type === value)} flex-col !gap-1 !px-2 sm:flex-row sm:!gap-1.5 sm:!px-3`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Trades don't have a price, so the box only shows for sale and Wanted items */}
          {type !== 'trade' && (
            <label className={labelClasses}>
              {type === 'buy' ? 'Budget (the most you’d pay)' : 'Price'}
              <span className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0"
                  className={`${inputClasses} pl-7`}
                />
              </span>
            </label>
          )}
          {type === 'buy' && (
            <p className="rounded-lg bg-purple-50 px-3 py-2 text-sm text-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
              This goes on your Wanted list: the “Have one of these? I’ll buy it.” box on the Browse page.
              Put the most you’d pay in <strong>Budget</strong>, and what you’re after (year, size, must-haves) in the description.
            </p>
          )}
          {type === 'trade' && (
            <label className={labelClasses}>
              What you'd trade it for (optional)
              <input
                value={tradeFor}
                onChange={(event) => setTradeFor(event.target.value)}
                placeholder="e.g. DC comics, or open to offers"
                className={inputClasses}
              />
            </label>
          )}
          <div className="grid gap-1">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Category</span>
            <Dropdown
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              fullWidth
              label="Category"
            />
          </div>

          {/* Condition: four choices showing the same gold stars buyers see */}
          <fieldset className="grid gap-1">
            <legend className="mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">Condition</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CONDITIONS.map(({ value, label, stars }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={condition === value}
                  aria-label={`${label}, ${stars} of 5 stars`}
                  onClick={() => setCondition(value)}
                  className={`${choiceClasses(condition === value)} flex-col !gap-0.5 py-2.5`}
                >
                  <span aria-hidden="true" className="text-xs leading-none tracking-[1px]">
                    <span className="text-[#d4af37]">{'★'.repeat(stars)}</span>
                    <span className={condition === value ? 'text-neutral-600' : 'text-neutral-300 dark:text-neutral-600'}>
                      {'★'.repeat(5 - stars)}
                    </span>
                  </span>
                  <span aria-hidden="true">{label}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 accent-[#d4af37]"
            />
            Show it in Featured Items on the home page
          </label>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={photoBusy}
          className="rounded-lg bg-[#1a1a1a] px-5 py-2.5 font-semibold text-[#d4af37] hover:bg-[#2d2d2d] disabled:opacity-60"
        >
          {item ? 'Save changes' : 'Post listing'}
        </button>
      </div>
    </form>
  )
}

export default AdminListingForm
