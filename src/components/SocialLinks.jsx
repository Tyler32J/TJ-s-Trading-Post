import { CONTACT } from '../data'

// lucide-react v1 removed brand logos, so these two are drawn by hand
// in the same outline style as the other icons.
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// Only links that are filled in (in CONTACT, data.js) are shown.
function SocialLinks() {
  const links = [
    { url: CONTACT.facebook, label: 'Facebook', Icon: FacebookIcon },
    { url: CONTACT.instagram, label: 'Instagram', Icon: InstagramIcon },
  ].filter((link) => link.url)

  if (links.length === 0) return null

  return (
    <div className="flex gap-3">
      {links.map(({ url, label, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-600 text-[#d4af37] transition-colors hover:border-[#d4af37]"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
