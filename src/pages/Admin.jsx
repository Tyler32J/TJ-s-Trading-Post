import { useState } from 'react'
import { ChevronDown, ChevronUp, GripVertical, Plus } from 'lucide-react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import GrapeIcon from '../components/GrapeIcon'
import OwnerGate from '../components/OwnerGate'
import ThemeToggle from '../components/ThemeToggle'
import AdminListingForm from '../components/AdminListingForm'
import WantedBoxWording from '../components/WantedBoxWording'
import { formatPrice, typeLabel } from '../utils'

// Tabs across the top of the admin page, so trade and Wanted listings each have their own spot.
const TABS = [
  { value: 'all', label: 'All', addLabel: 'Add listing', empty: 'No listings yet. Tap “Add listing” to post your first one.' },
  { value: 'sell', label: 'For Sale', addLabel: 'Add item for sale', empty: 'Nothing for sale right now.' },
  { value: 'trade', label: 'For Trade', addLabel: 'Add trade item', empty: 'No trade listings yet. Add something you’d swap, and what you’d want for it.' },
  { value: 'buy', label: 'Wanted (buying)', addLabel: 'Add something I want', empty: 'Nothing on your Wanted list yet. Tap “Add something I want” to add an item you’re looking to buy.' },
]

const smallButton =
  'rounded-md border border-neutral-300 px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200'

const arrowClasses =
  'flex h-7 items-center justify-center text-neutral-500 transition-colors hover:bg-[#d4af37]/20 hover:text-[#8a6d17] focus:outline-none focus-visible:bg-[#d4af37]/20 disabled:pointer-events-none disabled:opacity-25 dark:text-neutral-400 dark:hover:text-[#e0c04d]'

// One row in the listings list: photo, details, and the action buttons.
function ListingRow({ item, position, onEdit, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  // useSortable makes this row draggable. `listeners` go on the grip handle only,
  // so the buttons in the row still work normally.
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    position: 'relative',
  }

  let priceText = item.price ? `Budget ${formatPrice(item.price)}` : 'Wanted'
  if (item.type === 'sell') priceText = formatPrice(item.price) ?? 'No price'
  if (item.type === 'trade') priceText = item.tradeFor ? `Trade for ${item.tradeFor}` : 'Trade only'

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`flex flex-wrap items-center gap-4 rounded-xl border bg-white p-3 dark:bg-neutral-900 ${
        isDragging
          ? 'border-[#d4af37] shadow-2xl ring-2 ring-[#d4af37]/40'
          : 'border-neutral-200 dark:border-neutral-700'
      } ${item.hidden && !isDragging ? 'opacity-60' : ''}`}
    >
      {/* Grab here and drag the row up or down. Keyboard: focus it, press Space, use ↑ ↓, Space again. */}
      <button
        type="button"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label={`Drag to move ${item.title}`}
        className={`flex h-14 w-6 flex-shrink-0 touch-none items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#8a6d17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] dark:hover:bg-neutral-800 dark:hover:text-[#e0c04d] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Move this listing up or down. The order here is the order on the site. */}
      <div className="flex w-9 flex-shrink-0 flex-col items-stretch overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!onMoveUp}
          aria-label={`Move ${item.title} up`}
          className={arrowClasses}
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <span
          aria-label={`Position ${position}`}
          className="border-y border-neutral-200 py-0.5 text-center text-[11px] font-semibold tabular-nums text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
        >
          {position}
        </span>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!onMoveDown}
          aria-label={`Move ${item.title} down`}
          className={arrowClasses}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg ${item.sold ? 'grayscale' : ''}`}>
        {item.image ? (
          <img src={item.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400 dark:bg-neutral-800">
            No photo
          </div>
        )}
      </div>

      <div className="min-w-[180px] flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-900 dark:text-white">{item.title}</span>
          {item.featured && (
            <span className="rounded-full bg-[#d4af37]/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a6d17] dark:text-[#e0c04d]">
              ★ Featured
            </span>
          )}
          {item.sold && (
            <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
              Sold
            </span>
          )}
          {item.hidden && (
            <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-white dark:bg-neutral-200 dark:text-neutral-900">
              Hidden
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs capitalize text-neutral-500 dark:text-neutral-400">
          {typeLabel(item.type)} · {item.category} · {item.condition} · {priceText}
        </p>
      </div>

      {confirmingDelete ? (
        // Deleting asks first, so one stray tap can't remove a listing.
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-red-600 dark:text-red-400">Delete this listing?</span>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>
          <button type="button" onClick={() => setConfirmingDelete(false)} className={smallButton}>
            Keep it
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate(item.id, { featured: !item.featured })}
            aria-pressed={Boolean(item.featured)}
            className={`${smallButton} ${item.featured ? '!border-[#d4af37] !text-[#8a6d17] dark:!text-[#e0c04d]' : ''}`}
          >
            {item.featured ? '★ Featured' : '☆ Feature'}
          </button>
          <button type="button" onClick={() => onEdit(item.id)} className={smallButton}>
            Edit
          </button>
          {/* Hide takes it off the site without deleting it; Show puts it back. */}
          <button
            type="button"
            onClick={() => onUpdate(item.id, { hidden: !item.hidden })}
            className={smallButton}
          >
            {item.hidden ? 'Show on site' : 'Hide'}
          </button>
          {item.type === 'sell' && (
            <button
              type="button"
              onClick={() => onUpdate(item.id, { sold: !item.sold })}
              className={smallButton}
            >
              {item.sold ? 'Unmark sold' : 'Mark sold'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className={`${smallButton} !text-red-600 dark:!text-red-400`}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// The owner's admin page at /admin. Locked behind the PIN; once unlocked you can
// add, edit, delete, feature, and mark listings sold.
function Admin({
  items,
  isOwner,
  tryUnlock,
  lock,
  pinConfigured,
  onAdd,
  onUpdate,
  onDelete,
  onSwap,
  onReorder,
  siteText,
  saveSiteText,
  saveError,
  setCurrentView,
  theme,
  toggleTheme,
}) {
  // null = no form open, 'new' = adding, or the id of the listing being edited
  const [editing, setEditing] = useState(null)
  const [notice, setNotice] = useState('')
  const [tab, setTab] = useState('all')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  if (!isOwner) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 px-6 py-16 dark:bg-neutral-950">
        <OwnerGate onUnlock={tryUnlock} pinConfigured={pinConfigured} />
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="text-sm text-neutral-500 hover:underline dark:text-neutral-400"
        >
          ← Back to the site
        </button>
      </div>
    )
  }

  const itemBeingEdited = editing && editing !== 'new' ? items.find((i) => i.id === editing) : null
  const currentTab = TABS.find((t) => t.value === tab)
  const shownItems = tab === 'all' ? items : items.filter((item) => item.type === tab)
  const countFor = (value) => (value === 'all' ? items.length : items.filter((i) => i.type === value).length)
  const stats = [
    [items.length, 'listings'],
    [items.filter((i) => i.type === 'sell' && !i.sold).length, 'for sale'],
    [items.filter((i) => i.sold).length, 'sold'],
    [items.filter((i) => i.hidden).length, 'hidden'],
    [items.filter((i) => i.featured).length, 'featured'],
  ]

  function handleSave(data) {
    if (editing === 'new') {
      onAdd({
        id: Date.now(),
        ...data,
        seller: 'TJsTradingPost',
        datePosted: new Date().toISOString().slice(0, 10),
      })
      setNotice(`Posted “${data.title}”.`)
    } else {
      onUpdate(editing, data)
      setNotice(`Saved changes to “${data.title}”.`)
    }
    setEditing(null)
  }

  // When a dragged row is let go over another row, work out the new order and save it.
  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const ids = shownItems.map((item) => item.id)
    const newOrder = arrayMove(ids, ids.indexOf(active.id), ids.indexOf(over.id))
    onReorder(newOrder)
  }

  function openForm(which) {
    setEditing(which)
    setNotice('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#1a1a1a] px-6 py-3">
        <span className="flex items-center gap-2 text-[#d4af37]">
          <GrapeIcon className="h-5 w-5" />
          <span className="font-serif-display italic">TJ's Trading Post</span>
          <span className="ml-1 rounded bg-[#d4af37] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
            Admin
          </span>
        </span>
        <span className="flex items-center gap-4 text-sm">
          <button type="button" onClick={() => setCurrentView('home')} className="text-[#d4af37] hover:underline">
            View site
          </button>
          <button
            type="button"
            onClick={() => {
              lock()
              setCurrentView('home')
            }}
            className="text-neutral-400 hover:text-white"
          >
            Log out
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </span>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-serif-display text-3xl font-semibold text-neutral-900 dark:text-white">
              Your listings
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Changes show up on the site right away and are saved in this browser.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openForm('new')}
            className="flex items-center gap-2 rounded-lg bg-[#d4af37] px-4 py-2.5 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
          >
            <Plus className="h-4 w-4" />
            {currentTab.addLabel}
          </button>
        </div>

        {saveError && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {saveError}
          </p>
        )}
        {notice && !saveError && (
          <p role="status" className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-950/40 dark:text-green-300">
            {notice} <button type="button" onClick={() => setCurrentView('home')} className="font-semibold underline">View it on the site</button>
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(([count, label]) => (
            <div key={label} className="rounded-xl bg-white p-4 last:col-span-2 sm:last:col-span-1 dark:bg-neutral-900">
              <div className="text-2xl font-semibold tabular-nums text-neutral-900 dark:text-white">{count}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
            </div>
          ))}
        </div>

        {/* All / For Sale / For Trade / Wanted */}
        <div role="tablist" aria-label="Show listings" className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={tab === t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.value
                  ? 'bg-[#1a1a1a] text-[#d4af37]'
                  : 'bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              {t.label}
              <span className="rounded-full bg-black/10 px-1.5 text-xs dark:bg-white/15">{countFor(t.value)}</span>
            </button>
          ))}
        </div>

        {/* On the Wanted tab, a reminder of where these items show up on the site */}
        {tab === 'buy' && <WantedBoxWording siteText={siteText} saveSiteText={saveSiteText} />}

        {shownItems.length > 1 && (
          <p className="mt-3 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <GripVertical className="h-3.5 w-3.5" /> Drag a listing by its handle, or use the arrows, to change the order on your site.
          </p>
        )}

        {editing && (
          // key makes the form start fresh when switching from one listing to another
          <AdminListingForm
            key={editing}
            item={itemBeingEdited}
            // A new listing starts as the kind of the tab you're on (For Trade tab → a trade item).
            defaultType={tab === 'all' ? 'sell' : tab}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        )}

        <div className="mt-6 flex flex-col gap-3">
          {shownItems.length > 0 ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={shownItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            {shownItems.map((item, index) => {
              // Neighbors in the list you're looking at (so the arrows work inside a tab too).
              const above = shownItems[index - 1]
              const below = shownItems[index + 1]
              return (
                <ListingRow
                  key={item.id}
                  item={item}
                  position={index + 1}
                  onEdit={openForm}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onMoveUp={above ? () => onSwap(item.id, above.id) : null}
                  onMoveDown={below ? () => onSwap(item.id, below.id) : null}
                />
              )
            })}
            </SortableContext>
            </DndContext>
          ) : (
            <p className="rounded-xl bg-white p-8 text-center text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
              {currentTab.empty}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
