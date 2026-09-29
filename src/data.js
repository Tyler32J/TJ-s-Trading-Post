// Sample marketplace listings. In a real app this would come from a server.

import baseballCardsImage from './assets/vintage_baseball_card_collection.png'
import pocketWatchImage from './assets/antique_pocket_watch.png'
import comicBundleImage from './assets/comic_book_bundle.png'
import sneakersImage from './assets/limited_edition_sneakers.png'
import vinylImage from './assets/vinyl_record_collection.png'
import n64Image from './assets/vintage_video_game_console.png'
import appleWatchImage from './assets/apple_watch.png'

export const CATEGORIES = [
  'Handmade',
  'Collectibles',
  'Sports Cards',
  'Antiques',
  'Comics',
  'Shoes',
  'Music',
  'Gaming',
  'Other',
]

export const CONDITIONS = ['new', 'like-new', 'good', 'fair']

export const initialItems = [
  {
    id: 1,
    title: 'Vintage Baseball Card Collection',
    description:
      'Rare collection of 1980s baseball cards including rookie cards. Mint condition, professionally stored.',
    type: 'sell',
    price: 250,
    category: 'Sports Cards',
    condition: 'like-new',
    seller: 'TJsTradingPost',
    image: baseballCardsImage,
    datePosted: '2026-07-28',
  },
  {
    id: 2,
    title: 'Antique Pocket Watch',
    description:
      'Looking to buy a gold-plated pocket watch from the early 1900s. Must be in working condition, chain included preferred.',
    type: 'buy',
    price: 180,
    category: 'Antiques',
    condition: 'good',
    seller: 'TJsTradingPost',
    image: pocketWatchImage,
    datePosted: '2026-07-25',
  },
  {
    id: 3,
    title: 'Comic Book Bundle',
    description:
      'Looking to trade my Marvel collection for DC comics.',
    type: 'trade',
    price: null,
    category: 'Comics',
    condition: 'good',
    seller: 'TJsTradingPost',
    image: comicBundleImage,
    datePosted: '2026-07-30',
  },
  {
    id: 4,
    title: 'Limited Edition Sneakers',
    description:
      'Nike Air Jordan 1 Retro, size 10, worn twice. Original box and receipt included.',
    type: 'sell',
    price: 450,
    category: 'Shoes',
    condition: 'like-new',
    seller: 'TJsTradingPost',
    image: sneakersImage,
    datePosted: '2026-07-22',
  },
  {
    id: 5,
    title: 'Vinyl Record Collection',
    description:
      'Classic rock vinyl from the 60s and 70s. Beatles, Led Zeppelin, Pink Floyd and more.',
    type: 'sell',
    price: 320,
    category: 'Music',
    condition: 'good',
    seller: 'TJsTradingPost',
    image: vinylImage,
    datePosted: '2026-07-18',
  },
  {
    id: 6,
    title: 'Vintage Video Game Console',
    description:
      'Nintendo 64 with 8 games and 2 controllers. All in working condition.',
    type: 'sell',
    price: 200,
    category: 'Gaming',
    condition: 'good',
    seller: 'TJsTradingPost',
    image: n64Image,
    datePosted: '2026-07-15',
  },
  // {
  //   id: 7,
  //   title: 'Apple Watch Series 9',
  //   description:
  //     'Looking to buy a brand new, sealed Apple Watch Series 9. Must be the 45mm case, Aluminum, with all original accessories and packaging included.',
  //   type: 'buy',
  //   price: 220,
  //   category: 'Other',
  //   condition: 'new',
  //   seller: 'TJsTradingPost',
  //   image: appleWatchImage,
  //   datePosted: '2026-09-28',
  // },
]
