import { useState } from 'react'

// Bits of site wording you can change from the admin page, saved in this browser
// (same idea as useListings.js). Add more keys here later to make other text editable.
const STORAGE_KEY = 'tj-site-text'

export const DEFAULT_SITE_TEXT = {
  wantedEyebrow: "Didn't find it? Maybe you have something I want",
  wantedHeading: "Have one of these? I'll buy it.",
}

function loadSiteText() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return { ...DEFAULT_SITE_TEXT, ...(saved ?? {}) }
  } catch {
    return DEFAULT_SITE_TEXT
  }
}

export function useSiteText() {
  const [siteText, setSiteText] = useState(loadSiteText)

  function saveSiteText(changes) {
    const next = { ...siteText, ...changes }
    setSiteText(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage full or blocked: the change still shows until the page is refreshed.
    }
  }

  return { siteText, saveSiteText }
}
