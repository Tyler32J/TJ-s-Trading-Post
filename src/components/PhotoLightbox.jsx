import { useState } from 'react'
import { X } from 'lucide-react'

// Full-screen photo. Tap the photo to zoom in; tap again to zoom out.
function PhotoLightbox({ src, alt, onClose }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-auto bg-black/95 p-4"
      // stopPropagation keeps this click from also closing the item popup underneath.
      onClick={(event) => {
        event.stopPropagation()
        onClose()
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setZoomed((z) => !z)
        }}
        aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        className={zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}
      >
        <img
          src={src}
          alt={alt}
          className={`max-h-[85vh] max-w-full rounded-lg transition-transform duration-300 ${
            zoomed ? 'scale-[1.8]' : ''
          }`}
        />
      </button>

      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-xs text-white">
        {zoomed ? 'Tap to zoom out' : 'Tap the photo to zoom in'}
      </span>
    </div>
  )
}

export default PhotoLightbox
