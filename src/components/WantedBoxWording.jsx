import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { DEFAULT_SITE_TEXT } from '../useSiteText'

const inputClasses =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'

// On the admin page's Wanted tab: shows the wording of the "I'll buy it" box on the
// Browse page, and lets you change it. The preview updates as you type.
function WantedBoxWording({ siteText, saveSiteText }) {
  const [editing, setEditing] = useState(false)
  const [eyebrow, setEyebrow] = useState(siteText.wantedEyebrow)
  const [heading, setHeading] = useState(siteText.wantedHeading)
  const [saved, setSaved] = useState(false)

  // While editing, show what's being typed; otherwise show what's saved.
  const shownEyebrow = editing ? eyebrow : siteText.wantedEyebrow
  const shownHeading = editing ? heading : siteText.wantedHeading

  function startEditing() {
    setEyebrow(siteText.wantedEyebrow)
    setHeading(siteText.wantedHeading)
    setSaved(false)
    setEditing(true)
  }

  function handleSave(event) {
    event.preventDefault()
    saveSiteText({
      // An empty box falls back to the original wording, so the site never shows a blank heading.
      wantedEyebrow: eyebrow.trim() || DEFAULT_SITE_TEXT.wantedEyebrow,
      wantedHeading: heading.trim() || DEFAULT_SITE_TEXT.wantedHeading,
    })
    setEditing(false)
    setSaved(true)
  }

  function useOriginal() {
    setEyebrow(DEFAULT_SITE_TEXT.wantedEyebrow)
    setHeading(DEFAULT_SITE_TEXT.wantedHeading)
  }

  return (
    <div className="mt-4 rounded-xl border border-dashed border-purple-300 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-xl text-sm text-purple-900 dark:text-purple-200">
          Things you’re looking to buy. They show on the Browse page in this box, with your budget as “Up to $…”.
        </p>
        {!editing && (
          <button
            type="button"
            onClick={startEditing}
            className="flex items-center gap-1.5 rounded-lg border border-purple-300 bg-white px-3 py-1.5 text-sm font-medium text-purple-800 hover:border-purple-500 dark:border-purple-700 dark:bg-neutral-900 dark:text-purple-200"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit wording
          </button>
        )}
      </div>

      {/* Preview of the box's top, as it looks on the site */}
      <div className="mt-3 rounded-lg border border-purple-200 bg-white px-4 py-3 dark:border-purple-900 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-400">
          {shownEyebrow || DEFAULT_SITE_TEXT.wantedEyebrow}
        </p>
        <p className="font-serif-display mt-1 text-xl font-semibold text-neutral-900 dark:text-white">
          {shownHeading || DEFAULT_SITE_TEXT.wantedHeading}
        </p>
      </div>

      {saved && !editing && (
        <p role="status" className="mt-2 text-sm text-green-700 dark:text-green-400">
          Saved. The Browse page shows the new wording now.
        </p>
      )}

      {editing && (
        <form onSubmit={handleSave} className="mt-3 grid gap-3">
          <label className="grid gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Small line on top
            <input value={eyebrow} onChange={(event) => setEyebrow(event.target.value)} maxLength={80} className={inputClasses} />
          </label>
          <label className="grid gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Heading
            <input value={heading} onChange={(event) => setHeading(event.target.value)} maxLength={80} className={inputClasses} />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={useOriginal}
              className="text-sm text-neutral-500 hover:underline dark:text-neutral-400"
            >
              Use the original wording
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-[#d4af37] dark:border-neutral-600 dark:text-neutral-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#d4af37] hover:bg-[#2d2d2d]"
              >
                Save wording
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default WantedBoxWording
