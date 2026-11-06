import GrapeIcon from '../components/GrapeIcon'

// Shown when someone follows a broken or mistyped link, like /shopp.
// `path` is the address they tried, so they can see what went wrong.
function NotFound({ path, setCurrentView }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-6 py-20 dark:bg-neutral-900">
      <div className="flex max-w-md flex-col items-center text-center">
        <GrapeIcon className="h-12 w-11 text-[#d4af37]" />

        <p className="mt-5 font-mono text-xs font-semibold tracking-[0.25em] text-[#b8952a] dark:text-[#d4af37]">
          ERROR 404
        </p>

        <h1 className="font-serif-display mt-2 text-4xl font-semibold text-neutral-900 dark:text-white">
          Page not found
        </h1>

        <p className="mt-3 text-neutral-500 dark:text-neutral-400">
          We couldn't find{' '}
          {/* break-all lets a very long bad address wrap instead of stretching the page */}
          <code className="break-all rounded bg-[#d4af37]/15 px-1.5 py-0.5 text-sm text-neutral-800 dark:text-[#e8d38a]">
            {path}
          </code>
          . It may have moved or never existed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentView('marketplace')}
            className="rounded-lg bg-[#d4af37] px-6 py-3 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
          >
            Browse Items
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="rounded-lg border-2 border-[#d4af37] px-6 py-2.5 font-semibold text-[#b8952a] transition-colors hover:bg-[#d4af37]/10 dark:text-[#d4af37]"
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
