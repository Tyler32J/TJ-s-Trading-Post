import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ItemModal from './components/ItemModal'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ListItem from './pages/ListItem'
import { initialItems } from './data'
import { useTheme } from './useTheme'
import { useOwnerAuth } from './useOwnerAuth'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [items, setItems] = useState(initialItems)
  const [selectedItem, setSelectedItem] = useState(null)
  const { theme, toggleTheme } = useTheme()
  const { isOwner, tryUnlock, lock, pinConfigured } = useOwnerAuth()

  function handleAddItem(newItem) {
    setItems((prev) => [newItem, ...prev])
    setCurrentView('marketplace')
  }

  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors dark:bg-neutral-900">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        isOwner={isOwner}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            items={items}
            setCurrentView={setCurrentView}
            onSelectItem={setSelectedItem}
            isOwner={isOwner}
          />
        )}

        {currentView === 'marketplace' && (
          <Marketplace items={items} onSelectItem={setSelectedItem} />
        )}

        {currentView === 'list-item' && (
          <ListItem
            onSubmit={handleAddItem}
            onCancel={() => setCurrentView('marketplace')}
            isOwner={isOwner}
            tryUnlock={tryUnlock}
            lock={lock}
            pinConfigured={pinConfigured}
          />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} isOwner={isOwner} />

      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

export default App
