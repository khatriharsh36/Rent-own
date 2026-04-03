import React, { useState } from 'react'
import { MY_RENTALS } from '../data'

const SPEND_MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul']
const SPEND_DATA = [400, 750, 200, 1000, 1750]
const MAX = Math.max(...SPEND_DATA)

function Countdown({ endDate }) {
  const diff = Math.max(0, Math.ceil((new Date(endDate) - new Date()) / 86400000))
  return <span className="countdown">⏱ {diff} day{diff !== 1 ? 's' : ''} left</span>
}

function ReviewModal({ rental, onClose }) {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const handleSubmit = e => { e.preventDefault(); onClose(true) }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose(false)}>
      <div className="modal">
        <button className="modal-close" onClick={() => onClose(false)}>×</button>
        <h2>Leave a Review</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{rental.item}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} type="button"
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: s <= rating ? 'var(--amber)' : 'var(--border)' }}
                onClick={() => setRating(s)}>★</button>
            ))}
          </div>
          <div className="form-group">
            <label>Your Review</label>
            <textarea required placeholder="Share your experience..." value={text} onChange={e => setText(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary">Submit Review</button>
        </form>
      </div>
    </div>
  )
}

export default function RenteeDashboard({ user, wishlist, setWishlist, onBook, onSelect }) {
  const [tab, setTab] = useState('rentals')
  const [reviewRental, setReviewRental] = useState(null)
  const [reviewed, setReviewed] = useState([])

  const handleReviewClose = submitted => {
    if (submitted) setReviewed(r => [...r, reviewRental.id])
    setReviewRental(null)
  }

  return (
    <div className="page">
      <div className="dash-profile-header">
        <div className="dash-avatar rentee-avatar">{user.initials}</div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>{user.name}</h2>
          <span className="role-tag rentee-tag">🛒 Rentee</span>
        </div>
      </div>

      <div className="stats-row" style={{ marginBottom: '1.5rem' }}>
        {[['3', 'Total Rentals'], ['1', 'Active Now'], ['₹2,990', 'Total Spent']].map(([val, label]) => (
          <div key={label} className="stat-card">
            <div className="stat-value">{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="dash-tabs">
        {[['rentals', '📦 My Rentals'], ['wishlist', '♡ Wishlist'], ['spending', '💸 Spending']].map(([key, label]) => (
          <button key={key} className={`dash-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'rentals' && (
        <div>
          {MY_RENTALS.map(r => (
            <div key={r.id} className="rental-card">
              <div className="rental-info">
                <h4>{r.item}</h4>
                <p>Owner: {r.owner} · {r.start} → {r.end}</p>
                <p>Total paid: ₹{r.total}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                <span className={`status-badge ${r.status}`}>{r.status}</span>
                {r.status === 'Active' && <Countdown endDate={r.end} />}
                {r.status === 'Completed' && !reviewed.includes(r.id) && (
                  <button className="review-cta" onClick={() => setReviewRental(r)}>⭐ Leave Review</button>
                )}
                {r.status === 'Completed' && reviewed.includes(r.id) && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✓ Reviewed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'wishlist' && (
        <div>
          {wishlist.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>Your wishlist is empty. Browse items and add some!</p>
          )}
          {wishlist.map(w => (
            <div key={w.id} className="rental-card">
              <div className="rental-info">
                <h4>{w.name}</h4>
                <p>Owner: {w.owner} · ₹{w.price}/day</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn-primary"
                  style={{ width: 'auto', padding: '0.45rem 1rem', fontSize: '0.85rem', marginBottom: 0 }}
                  onClick={() => onSelect(w)}
                >Book Now</button>
                <button
                  className="btn-secondary"
                  style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                  onClick={() => setWishlist(ws => ws.filter(x => x.id !== w.id))}
                >✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'spending' && (
        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Monthly Spending (₹)</h3>
            <div className="bar-chart">
              {SPEND_MONTHS.map((m, i) => (
                <div key={m} className="bar-wrap">
                  <span className="bar-val">₹{SPEND_DATA[i]}</span>
                  <div className="bar" style={{ height: `${(SPEND_DATA[i] / MAX) * 100}px`, background: i === 4 ? 'var(--amber)' : 'var(--green)' }} />
                  <span className="bar-label">{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="spend-breakdown">
            <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem' }}>Category Breakdown</h3>
            {[['Electronics', 1750, 59], ['Gadgets', 700, 23], ['Bikes', 540, 18]].map(([cat, amt, pct]) => (
              <div key={cat} className="spend-row">
                <span>{cat}</span>
                <div className="spend-bar-track">
                  <div className="spend-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span style={{ fontWeight: 600, color: 'var(--green)', minWidth: 60, textAlign: 'right' }}>₹{amt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewRental && <ReviewModal rental={reviewRental} onClose={handleReviewClose} />}
    </div>
  )
}
