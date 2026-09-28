import ListItemForm from '../components/ListItemForm'
import OwnerGate from '../components/OwnerGate'

function ListItem({ onSubmit, onCancel, isOwner, tryUnlock, lock, pinConfigured }) {
  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-10 dark:bg-neutral-900">
      {isOwner ? (
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={lock}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-[#1a1a1a] hover:underline dark:text-neutral-400 dark:hover:text-[#d4af37]"
            >
              Log out
            </button>
          </div>
          <ListItemForm onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      ) : (
        <OwnerGate onUnlock={tryUnlock} pinConfigured={pinConfigured} />
      )}
    </section>
  )
}

export default ListItem
