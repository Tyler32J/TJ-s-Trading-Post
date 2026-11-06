import { CONTACT } from './data'

// Builds "Text" and "Email" links with a message already filled in.
// encodeURIComponent turns spaces and symbols into a safe link format.
export function messageLinks(message, subject = "TJ's Trading Post") {
  return {
    sms: `sms:${CONTACT.phone}?&body=${encodeURIComponent(message)}`,
    email: `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  }
}

// True when an item's price was lowered (it has a higher originalPrice).
export function hasPriceDrop(item) {
  return item.originalPrice != null && item.price != null && item.originalPrice > item.price
}

// Used by the Browse page's price filter. Items with no price (trades) only show under "Any price".
export function matchesPriceRange(item, range) {
  if (range === 'all') return true
  if (item.price == null) return false
  if (range === 'under-100') return item.price < 100
  if (range === '100-300') return item.price >= 100 && item.price <= 300
  if (range === 'over-300') return item.price > 300
  return true
}

export function formatPrice(price) {
  if (price == null) return null
  return `$${price.toLocaleString()}`
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// True if the item was posted within the last `days` days.
export function isRecent(dateString, days = 7) {
  const posted = new Date(dateString)
  const msPerDay = 1000 * 60 * 60 * 24
  return (Date.now() - posted.getTime()) / msPerDay <= days
}

export function typeBadgeClasses(type) {
  switch (type) {
    case 'sell':
      return 'bg-green-100 text-green-800'
    case 'trade':
      return 'bg-blue-100 text-blue-800'
    case 'buy':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-neutral-100 text-neutral-800'
  }
}

export function typeLabel(type) {
  switch (type) {
    case 'sell':
      return 'For Sale'
    case 'trade':
      return 'For Trade'
    case 'buy':
      return 'Wanted'
    default:
      return type
  }
}
