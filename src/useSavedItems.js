import { useState } from 'react'

// Remembers which items a visitor has hearted, in their own browser.
// Same localStorage idea as useTheme.js. It's per-device only, which is fine
// until the real database step.
const STORAGE_KEY = 'savedItems'

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function useSavedItems() {
  const [savedIds, setSavedIds] = useState(readSaved)

  function toggleSaved(id) {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Storage blocked (private window, etc.) — the heart still works for this visit.
      }
      return next
    })
  }

  return { savedIds, isSaved: (id) => savedIds.includes(id), toggleSaved }
}
