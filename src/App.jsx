import React, { useState, useMemo, useEffect } from 'react'
import { ITEMS, CATEGORIES } from './data'
import Navbar from './components/Navbar'
import Login from './components/Login'
import ItemCard from './components/ItemCard'
import ItemDetail from './components/ItemDetail'
import ListItem from './components/ListItem'
import RenteeDashboard from './components/RenteeDashboard'
import RenterDashboard from './components/RenterDashboard'
import BookingModal from './components/BookingModal'

const LOCATIONS = ['All Areas', 'North Campus', 'South Campus', 'City Centre', 'Hostel Block']

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) }, [onDone])
  return <div className="toast">{msg}</div>
}

function BrowsePage({ onSelect }) {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All Areas')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(400)
  const [sortBy, setSortBy] = useState('distance')
  const [catFilters, setCatFilters] = useState([])

  const toggleCat = c => setCatFilters(f => f.includes(c) ? f.filter(x => x !== c) : [...f, c])

  const filtered = useMemo(() => {
    let list = ITEMS.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || item.category === category
      const matchPrice = item.price <= maxPrice
      const matchCatFilter = catFilters.length === 0 || catFilters.includes(item.category)
      return matchSearch && matchCat && matchPrice && matchCatFilter
    })
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price)
    else if (sortBy === 'distance') list = [...list].sort((a, b) => a.distance - b.distance)
    else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [search, category, maxPrice, catFilters, sortBy])

  return (
    <div className="page">
      <div className="hero">
        <h1>Borrow. Share. Save.</h1>
        <p>Rent anything from your community — bikes, gadgets, books & more.</p>
        <div className="search-row">
          <input className="search-input" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="location-select" value={location} onChange={e => setLocation(e.target.value)}>
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="category-pills">
        {CATEGORIES.map(c => (
          <button key={c} className={`pill${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="browse-layout">
        <aside className="sidebar">
          <h3>Filters</h3>
          <div className="sidebar-section">
            <label>Max Price / Day</label>
            <input type="range" min="20" max="400" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
            <div className="price-display">Up to ₹{maxPrice}/day</div>
          </div>
          <div className="sidebar-section">
            <label>Category</label>
            {CATEGORIES.filter(c => c !== 'All').map(c => (
              <label key={c} className="check-label">
                <input type="checkbox" checked={catFilters.includes(c)} onChange={() => toggleCat(c)} />
                {c}
              </label>
            ))}
          </div>
          <div className="sidebar-section">
            <label>Sort By</label>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="distance">Distance</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </aside>

        <div className="items-grid">
          {filtered.length === 0
            ? <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>No items match your filters.</p>
            : filtered.map((item, i) => <ItemCard key={item.id} item={item} index={i} onClick={onSelect} />)
          }
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('browse')
  const [selectedItem, setSelectedItem] = useState(null)
  const [booking, setBooking] = useState(null)
  const [toast, setToast] = useState(null)
  const [wishlist, setWishlist] = useState([])

  const showToast = msg => setToast(msg)

  const handleLogin = userData => {
    setUser(userData)
    setPage('browse')
  }

  const handleLogout = () => {
    setUser(null)
    setPage('browse')
    setSelectedItem(null)
    setBooking(null)
  }

  const handleSelect = item => { setSelectedItem(item); setPage('detail') }
  const handleBack = () => { setSelectedItem(null); setPage('browse') }

  const handleWishlist = item => {
    setWishlist(ws => {
      const exists = ws.find(w => w.id === item.id)
      if (exists) { showToast('Removed from wishlist'); return ws.filter(w => w.id !== item.id) }
      showToast('Added to wishlist ♡')
      return [...ws, item]
    })
  }

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <>
      <Navbar
        page={page === 'detail' ? 'browse' : page}
        setPage={p => { setSelectedItem(null); setPage(p) }}
        user={user}
        onLogout={handleLogout}
      />

      {page === 'browse' && <BrowsePage onSelect={handleSelect} />}
      {page === 'detail' && selectedItem && (
        <ItemDetail
          item={selectedItem}
          onBack={handleBack}
          onBook={setBooking}
          onWishlist={handleWishlist}
          inWishlist={wishlist.some(w => w.id === selectedItem.id)}
        />
      )}
      {page === 'list' && user.role === 'renter' && <ListItem showToast={showToast} />}
      {page === 'dashboard' && user.role === 'rentee' && (
        <RenteeDashboard user={user} wishlist={wishlist} setWishlist={setWishlist} onBook={setBooking} onSelect={handleSelect} />
      )}
      {page === 'dashboard' && user.role === 'renter' && (
        <RenterDashboard user={user} onListItem={() => setPage('list')} />
      )}

      {booking && <BookingModal booking={booking} onClose={() => setBooking(null)} />}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}
