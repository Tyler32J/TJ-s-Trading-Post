import { useState } from 'react'
import MessagePanel from './MessagePanel'
import Dropdown from './Dropdown'
import { CONTACT } from '../data'

const MATERIALS = ['Wood', 'Metal', 'Wood & metal', 'Not sure']
const BUDGETS = ['Under $50', '$50–$150', '$150–$300', '$300+']

// "How it works" steps shown under the heading, so first-time buyers know what happens next.
// The town comes from CONTACT in data.js ("Tupelo, MS" -> "Tupelo").
const STEPS = [
  { title: 'Tell me your idea', text: 'Fill out the form. It turns into a text or email to me.' },
  { title: 'Get a price and timeline', text: 'I’ll reply with what it costs and how long it takes.' },
  { title: `Pick it up in ${CONTACT.location.split(',')[0]}`, text: 'When it’s ready, we meet up for local pickup.' },
]

// The site's own styled drop-down wants {value, label} pairs.
const toOptions = (list) => list.map((text) => ({ value: text, label: text }))

const inputClasses =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
const labelClasses = 'grid gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200'

// "Want something built?" form for handmade commissions.
// There's no server yet, so instead of submitting somewhere, it builds a
// message from the answers and lets the visitor text or email it to Tyler.
function CustomOrderForm() {
  const [what, setWhat] = useState('')
  const [size, setSize] = useState('')
  // Both start empty ("Choose one…"). They're optional; anything picked goes into the message.
  const [material, setMaterial] = useState('')
  const [budget, setBudget] = useState('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!what.trim()) {
      setError('Tell me what you’d like built.')
      return
    }
    setError('')
    setReady(true)
  }

  const message =
    `Hi Tyler, I'd like a custom piece: ${what.trim()}.` +
    (size.trim() ? ` Size: ${size.trim()}.` : '') +
    (material ? ` Material: ${material}.` : '') +
    (budget ? ` Budget: ${budget}.` : '')

  return (
    <section id="custom-order" className="scroll-mt-24 bg-neutral-100 px-6 py-16 dark:bg-neutral-800/40">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8952a] dark:text-[#d4af37]">
            Custom work
          </p>
          <h2 className="font-serif-display mt-1 text-3xl font-semibold text-neutral-900 dark:text-white">
            Want something built?
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            Tell me what you have in mind. I build in wood, metal, or both, and
            I'll get back to you with a price and a timeline.
          </p>

          {/* How it works: numbered because it's a real order of steps */}
          <ol className="mt-6 grid gap-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#1a1a1a]"
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-neutral-900 dark:text-white">{step.title}</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-xl bg-white p-5 shadow-sm dark:bg-neutral-900"
        >
          <label className={labelClasses}>
            What would you like?
            <input
              value={what}
              onChange={(event) => {
                setWhat(event.target.value)
                setReady(false)
                setError('')
              }}
              className={inputClasses}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={labelClasses}>
              Size (optional)
              <input
                value={size}
                onChange={(event) => setSize(event.target.value)}
                className={inputClasses}
              />
            </label>
            {/* The site's styled drop-down (same as the Sort menu and the admin page) */}
            <div className={labelClasses}>
              <span>Material</span>
              <Dropdown
                value={material}
                onChange={setMaterial}
                options={toOptions(MATERIALS)}
                placeholder="Choose one…"
                fullWidth
                label="Material"
              />
            </div>
          </div>
          <div className={labelClasses}>
            <span>Budget</span>
            <Dropdown
              value={budget}
              onChange={setBudget}
              options={toOptions(BUDGETS)}
              placeholder="Choose one…"
              fullWidth
              label="Budget"
            />
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            // Black with gold text; turns gold when hovered or pressed.
            className="mt-1 rounded-lg bg-[#1a1a1a] py-3 font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37] hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 active:bg-[#e0c04d] active:text-[#1a1a1a] dark:focus-visible:ring-offset-neutral-900"
          >
            Write my request
          </button>

          {ready && (
            <MessagePanel
              title="Your request is ready. Send it to Tyler:"
              message={message}
              subject="TJ's Trading Post: custom order request"
            />
          )}
        </form>
      </div>
    </section>
  )
}

export default CustomOrderForm
