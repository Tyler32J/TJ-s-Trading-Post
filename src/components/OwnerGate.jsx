import { useState } from 'react'
import { Lock } from 'lucide-react'

function OwnerGate({ onUnlock, pinConfigured }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!pinConfigured) return
    const success = onUnlock(pin)
    if (!success) {
      setError('Incorrect PIN. Try again.')
      setPin('')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-neutral-800">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#d4af37]">
          <Lock className="h-5 w-5" />
        </span>
        <h2 className="font-serif-display text-2xl font-semibold text-neutral-900 dark:text-white">
          Owner Access
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Enter the owner PIN to list a new item.
        </p>
      </div>

      {pinConfigured ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            PIN
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              required
              value={pin}
              onChange={(event) => {
                setPin(event.target.value)
                setError('')
              }}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-normal text-neutral-900 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
              placeholder="••••"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'pin-error' : undefined}
            />
          </label>

          {error && (
            <p id="pin-error" role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-[#1a1a1a] py-3 font-semibold text-white transition-colors hover:bg-[#2d2d2d]"
          >
            Unlock
          </button>
        </form>
      ) : (
        <p className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
          Owner PIN isn't configured. Add <code>VITE_OWNER_PIN</code> to a{' '}
          <code>.env.local</code> file at the project root and restart{' '}
          <code>npm run dev</code>.
        </p>
      )}
    </div>
  )
}

export default OwnerGate
