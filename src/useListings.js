import { useState } from 'react'
import { initialItems } from './data'

// Your listings, saved in this browser (localStorage) so they survive a refresh.
// This is the stopgap before the real database step: the saved copy lives only on
// the device you used, so visitors on other devices still see the sample listings.
const STORAGE_KEY = 'tj-listings'
const SAMPLES_BY_ID = Object.fromEntries(initialItems.map((item) => [item.id, item]))

function loadListings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(saved)) return initialItems

    // The built-in sample photos get new file names every time the site is built,
    // so re-attach the current ones. Photos you uploaded (saved as "data:" text) stay as-is.
    const isUpload = (src) => typeof src === 'string' && src.startsWith('data:')
    return saved.map((item) => {
      const sample = SAMPLES_BY_ID[item.id]
      if (!sample) return item
      return {
        ...item,
        image: isUpload(item.image) ? item.image : sample.image,
        // Same fix inside the photo list, for a sample item you added extra photos to.
        ...(item.images && {
          images: item.images.map((src) => (isUpload(src) ? src : sample.image)),
        }),
      }
    })
  } catch {
    return initialItems
  }
}

export function useListings() {
  const [items, setItems] = useState(loadListings)
  const [saveError, setSaveError] = useState('')

  // Every change goes through here: update the screen, then save the new list.
  function commit(nextItems) {
    setItems(nextItems)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
      setSaveError('')
    } catch {
      setSaveError(
        "Couldn't save that change in this browser. It may be out of space; try a smaller photo or delete an old listing."
      )
    }
  }

  function addItem(item) {
    commit([item, ...items])
  }

  function updateItem(id, changes) {
    commit(items.map((item) => (item.id === id ? { ...item, ...changes } : item)))
  }

  function deleteItem(id) {
    commit(items.filter((item) => item.id !== id))
  }

  // Swaps two listings' places. The order of this list is the order they show on the site.
  function swapItems(idA, idB) {
    const a = items.findIndex((item) => item.id === idA)
    const b = items.findIndex((item) => item.id === idB)
    if (a === -1 || b === -1) return
    const next = [...items]
    ;[next[a], next[b]] = [next[b], next[a]]
    commit(next)
  }

  // Used by drag-and-drop. `orderedIds` is the new order of the listings you were looking at
  // (all of them, or just one tab like For Trade). Those listings are put back into the same
  // spots they held before, in the new order, so items in other tabs don't move.
  function reorderItems(orderedIds) {
    const slots = items
      .map((item, index) => (orderedIds.includes(item.id) ? index : -1))
      .filter((index) => index !== -1)
    const byId = Object.fromEntries(items.map((item) => [item.id, item]))
    const next = [...items]
    slots.forEach((slot, k) => {
      next[slot] = byId[orderedIds[k]]
    })
    commit(next)
  }

  return { items, addItem, updateItem, deleteItem, swapItems, reorderItems, saveError }
}
