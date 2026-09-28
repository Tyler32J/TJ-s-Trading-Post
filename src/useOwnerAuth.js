import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tj-owner-unlocked'
const OWNER_PIN = import.meta.env.VITE_OWNER_PIN

function getInitialUnlocked() {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function useOwnerAuth() {
  const [isOwner, setIsOwner] = useState(getInitialUnlocked)
  const pinConfigured = Boolean(OWNER_PIN)

  useEffect(() => {
    if (isOwner) {
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [isOwner])

  function tryUnlock(pin) {
    if (pinConfigured && pin === OWNER_PIN) {
      setIsOwner(true)
      return true
    }
    return false
  }

  function lock() {
    setIsOwner(false)
  }

  return { isOwner, tryUnlock, lock, pinConfigured }
}
