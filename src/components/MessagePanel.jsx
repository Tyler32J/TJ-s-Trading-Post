import { Mail, MessageCircle } from 'lucide-react'
import { messageLinks } from '../utils'

// A box that shows a ready-made message plus "Text" and "Email" buttons.
// Used by Contact Seller, Make an Offer, Offer a Trade, and Custom Orders,
// so they all look and work the same way.
// `children` is any extra inputs (like the offer amount) shown above the message.
function MessagePanel({ title, message, subject, note, children }) {
  const { sms, email } = messageLinks(message, subject)

  return (
    <div className="mt-3 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 p-4">
      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{title}</p>
      {children}
      <p className="mt-2 rounded-lg bg-white p-2 text-sm italic text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
        “{message}”
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={sms}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1a1a1a] py-2.5 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37] hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 active:bg-[#e0c04d] active:text-[#1a1a1a] dark:focus-visible:ring-offset-neutral-900"
        >
          <MessageCircle className="h-4 w-4" />
          Text
        </a>
        <a
          href={email}
          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 active:border-[#e0c04d] active:bg-[#e0c04d] active:text-[#1a1a1a] dark:border-neutral-600 dark:text-neutral-200 dark:hover:border-[#d4af37] dark:hover:text-[#1a1a1a] dark:focus-visible:ring-offset-neutral-900"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
      {note && <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{note}</p>}
    </div>
  )
}

export default MessagePanel
