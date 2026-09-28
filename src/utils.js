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
