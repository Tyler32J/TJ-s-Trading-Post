import { useState } from 'react'
import { Gem, Hammer, MapPin } from 'lucide-react'
import MessagePanel from '../components/MessagePanel'
import { CONTACT } from '../data'

// Files in the public folder are served from the site's root, so public/profile.jpg is "/profile.jpg".
// If you change the photo later, bump the ?v= number so browsers load the new one instead of an old saved copy.
const PROFILE_PHOTO = '/profile.jpg?v=1'

// The About page. All of the wording here is a starting draft:
// rewrite it in your own voice (search this file for the paragraphs).
function About({ setCurrentView }) {
  // Becomes true if public/profile.jpg can't be loaded, so the "TJ" circle shows instead of a broken image.
  const [photoMissing, setPhotoMissing] = useState(false)

  return (
    <>
      {/* Intro: moved here from the home page */}
      <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] px-6 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          {/* Your photo in a circle with a gold ring. To add it, save your picture as
              public/profile.jpg. Until that file exists, the circle shows "TJ" instead. */}
          <div className="h-44 w-44 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-[#d4af37] ring-offset-4 ring-offset-[#1f1f1f]">
            {photoMissing ? (
              <div className="flex h-full w-full items-center justify-center bg-[#d4af37] font-serif-display text-6xl text-[#1a1a1a]">
                TJ
              </div>
            ) : (
              <img
                src={PROFILE_PHOTO}
                alt="Tyler"
                onError={() => setPhotoMissing(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              About
            </p>
            <h1 className="font-serif-display mt-1 text-4xl italic text-[#d4af37] sm:text-5xl">
              Hey, I'm Tyler.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-300">
              I build things out of wood and metal in my shop in Tupelo,
              Mississippi, and I hunt down good collectibles on the side.
              Everything on this site passes through my hands first. If you
              see something you like, or want to work out a trade, reach out.
            </p>
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="bg-neutral-50 px-6 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif-display text-3xl font-semibold text-neutral-900 dark:text-white">
            What you'll find here
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Hammer,
                title: 'Built by hand',
                text: 'Wood and metal pieces I make myself in my own shop. Each one is one of a kind.',
              },
              {
                Icon: Gem,
                title: 'Hand-picked collectibles',
                text: 'Cards, vinyl, comics, games, and antiques I’ve found and checked over before listing.',
              },
              {
                Icon: MapPin,
                title: 'Local and personal',
                text: `Based in ${CONTACT.location}. Local pickup, and I’m always open to a trade.`,
              },
            ].map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#d4af37]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-neutral-600 dark:text-neutral-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="bg-white px-6 py-16 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif-display text-3xl font-semibold text-neutral-900 dark:text-white">
              Say hello
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Questions about an item, a custom piece, or a trade idea? Send me
              a message. I'm happy to talk shop.
            </p>
            <button
              type="button"
              onClick={() => setCurrentView('marketplace')}
              className="mt-6 rounded-lg bg-[#d4af37] px-6 py-3 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e0c04d]"
            >
              Browse Items
            </button>
          </div>
          <MessagePanel
            title="Message Tyler"
            message="Hi Tyler, I found your site and wanted to reach out!"
            subject="TJ's Trading Post: hello"
            note={`Or call ${CONTACT.phoneDisplay}`}
          />
        </div>
      </section>
    </>
  )
}

export default About
