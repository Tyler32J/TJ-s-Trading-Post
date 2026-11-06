import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Size of the ring: a circle with radius 21 inside a 48 x 48 box.
const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// The back-to-top button: a black circle with a gold arrow. Its gold ring fills up
// as you scroll down, so it also shows how far down the page you are.
// It fades in after you've scrolled a bit, and takes you back to the top when tapped.
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0) // 0 = top of the page, 1 = bottom

  useEffect(() => {
    function handleScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > 500)
      setProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`Back to top (${Math.round(progress * 100)}% down the page)`}
      // Kept on the page but faded out and unclickable when not needed,
      // so it can fade and slide in smoothly instead of popping in.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#d4af37] shadow-lg transition-all duration-300 hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      {/* The ring. -rotate-90 makes it start filling from the top instead of the right. */}
      <svg className="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="#d4af37"
          strokeWidth="3"
          strokeLinecap="round"
          // A dashed outline exactly one circle long; sliding the dash ("offset") reveals more of it.
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" />
    </button>
  )
}

export default BackToTop
