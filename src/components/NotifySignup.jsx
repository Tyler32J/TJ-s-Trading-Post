import { Bell, MessageCircle } from 'lucide-react'
import { messageLinks } from '../utils'

// "Get a text when new pieces drop."
// With no database yet, the site can't store phone numbers itself. So this
// opens a text to Tyler asking to be added; he keeps the list in his phone.
// Once the database step is done, this can become a real phone-number form.
function NotifySignup() {
  const { sms } = messageLinks(
    "Hi Tyler, please add me to your list. Text me when you post new handmade pieces!"
  )

  return (
    <section className="bg-white px-6 py-12 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#b8952a] dark:text-[#d4af37]">
          <Bell className="h-5 w-5" />
        </span>
        <h2 className="font-serif-display text-2xl font-semibold text-neutral-900 dark:text-white">
          Get a text when new pieces drop
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Handmade work sells fast. Tap below to send me a quick text and I'll
          let you know when something new is listed. No spam.
        </p>
        <a
          href={sms}
          className="mt-1 flex items-center gap-2 rounded-lg bg-[#d4af37] px-6 py-3 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
        >
          <MessageCircle className="h-5 w-5" />
          Text me to join the list
        </a>
      </div>
    </section>
  )
}

export default NotifySignup
