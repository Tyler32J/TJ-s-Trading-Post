import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ItemModal from './components/ItemModal'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Saved from './pages/Saved'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Admin from './pages/Admin'
import { useTheme } from './useTheme'
import { useOwnerAuth } from './useOwnerAuth'
import { useSavedItems } from './useSavedItems'
import { useListings } from './useListings'
import { useSiteText } from './useSiteText'

// The site has two real addresses: the home page ("/") and the owner's admin page ("/admin").
// Anything else (a typo or an old link, like /shopp) shows the 404 page.
function viewForPath(path) {
  if (path === '/' || path === '/index.html') return 'home'
  if (path === '/admin' || path === '/admin/') return 'admin'
  return 'not-found'
}

const startPath = window.location.pathname

function App() {
  const [currentView, setCurrentView] = useState(() => viewForPath(startPath))
  const [badPath, setBadPath] = useState(startPath)
  const [selectedItem, setSelectedItem] = useState(null)
  const { theme, toggleTheme } = useTheme()
  const { isOwner, tryUnlock, lock, pinConfigured } = useOwnerAuth()

  // Your listings, saved in this browser so changes from /admin survive a refresh.
  const { items, addItem, updateItem, deleteItem, swapItems, reorderItems, saveError } = useListings()

  // Wording you can change from the admin page (like the Wanted box's heading).
  const { siteText, saveSiteText } = useSiteText()

  // Hidden listings stay in admin but are left off every page visitors see.
  const visibleItems = items.filter((item) => !item.hidden)

  // Saved items live here (not inside the popup) so the header count
  // and the Saved page update the moment a heart is tapped.
  const { savedIds, isSaved, toggleSaved } = useSavedItems()

  // The list the open item came from, so Previous / Next in the popup steps through
  // what the visitor was actually looking at (for example, only "Music" items).
  const [browseList, setBrowseList] = useState([])

  // Ids of the last few items opened, newest first, for the "Recently viewed" row.
  const [recentIds, setRecentIds] = useState([])

  // The search words typed on the home page, handed to the Marketplace when it opens.
  const [startingSearch, setStartingSearch] = useState('')

  // A type filter to open the Browse page with (the footer's For Trade / Wanted links).
  const [startingType, setStartingType] = useState('all')

  // The browser's Back / Forward buttons change the address without reloading,
  // so show whichever page matches the new address.
  useEffect(() => {
    function handleBackForward() {
      const path = window.location.pathname
      setCurrentView(viewForPath(path))
      setBadPath(path)
      setSelectedItem(null)
    }
    window.addEventListener('popstate', handleBackForward)
    return () => window.removeEventListener('popstate', handleBackForward)
  }, [])

  // Normal navigation (header, footer, buttons). Also keeps the address bar in step:
  // going to the admin page shows /admin, and everything else goes back to /.
  function navigate(view) {
    const path = window.location.pathname
    if (view === 'admin') {
      if (path !== '/admin') window.history.pushState(null, '', '/admin')
    } else if (path === '/admin') {
      window.history.pushState(null, '', '/')
    } else if (path !== '/') {
      // Leaving the 404 page: swap the bad address for the home page.
      window.history.replaceState(null, '', '/')
    }
    setStartingSearch('')
    setStartingType('all')
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  // Footer: open Browse with For Trade or Wanted already picked.
  function browseType(type) {
    navigate('marketplace')
    setStartingType(type)
  }

  // Footer: go to the home page's "Want something built?" form.
  function goToCustomOrder() {
    navigate('home')
    // Wait a moment so the home page is on screen before scrolling to the form.
    setTimeout(() => {
      document.getElementById('custom-order')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  function searchFromHome(term) {
    if (window.location.pathname !== '/') window.history.replaceState(null, '', '/')
    setStartingSearch(term)
    setCurrentView('marketplace')
    window.scrollTo(0, 0)
  }

  // `list` is optional. The Browse page passes its filtered items; anywhere else
  // (home page, suggestions, saved items) falls back to every listing.
  function openItem(item, list = visibleItems) {
    setSelectedItem(item)
    setBrowseList(list)
    // Move this item to the front, drop any older copy of it, keep the 5 newest.
    setRecentIds((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 5))
  }

  // The admin page has its own header and no footer, so it replaces the whole site.
  if (currentView === 'admin') {
    return (
      <Admin
        items={items}
        isOwner={isOwner}
        tryUnlock={tryUnlock}
        lock={lock}
        pinConfigured={pinConfigured}
        onAdd={addItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
        onSwap={swapItems}
        onReorder={reorderItems}
        siteText={siteText}
        saveSiteText={saveSiteText}
        saveError={saveError}
        setCurrentView={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    )
  }

  const recentItems = recentIds
    .map((id) => visibleItems.find((item) => item.id === id))
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors dark:bg-neutral-900">
      <Header
        currentView={currentView}
        setCurrentView={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
        isOwner={isOwner}
        savedCount={savedIds.length}
        items={visibleItems}
        onSelectItem={openItem}
        onSearch={searchFromHome}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            items={visibleItems}
            setCurrentView={navigate}
            onSelectItem={openItem}
            isOwner={isOwner}
            onSearch={searchFromHome}
            isSaved={isSaved}
            onToggleSave={toggleSaved}
          />
        )}

        {currentView === 'about' && <About setCurrentView={navigate} />}

        {currentView === 'marketplace' && (
          <Marketplace
            // A new search from the header or home page makes the Browse page start fresh with it,
            // even if you're already on that page.
            key={`${startingSearch}|${startingType}`}
            items={visibleItems}
            onSelectItem={openItem}
            initialSearch={startingSearch}
            initialType={startingType}
            recentItems={recentItems}
            siteText={siteText}
            isSaved={isSaved}
            onToggleSave={toggleSaved}
          />
        )}

        {currentView === 'saved' && (
          <Saved
            items={visibleItems}
            savedIds={savedIds}
            onSelectItem={openItem}
            isSaved={isSaved}
            onToggleSave={toggleSaved}
            setCurrentView={navigate}
          />
        )}

        {currentView === 'not-found' && (
          <NotFound path={badPath} setCurrentView={navigate} />
        )}
      </main>

      <Footer
        setCurrentView={navigate}
        isOwner={isOwner}
        onBrowseType={browseType}
        onCustomOrder={goToCustomOrder}
      />

      <BackToTop />

      {/* key resets the popup's state (like an open contact panel) for each new item */}
      <ItemModal
        key={selectedItem?.id ?? 'closed'}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isSaved={isSaved}
        toggleSaved={toggleSaved}
        allItems={visibleItems}
        onSelectItem={openItem}
        browseList={browseList}
      />
    </div>
  )
}

export default App
