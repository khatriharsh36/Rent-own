import React, { useState } from 'react'
import { MY_RENTALS, MY_LISTINGS } from '../data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const EARNINGS = [800, 1200, 600, 1800, 1400, 2100, 900]
const MAX = Math.max(...EARNINGS)

function Countdown({ endDate }) {
  const diff = Math.max(0, Math.ceil((new Date(endDate) - new Date()) / 86400000))
  return <span className="countdown">⏱ {diff} day{diff !== 1 ? 's' : ''} left</span>
}

export default function Dashboard() {
  const [tab, setTab] = useState('rentals')
  const [listings, setListings] = useState(MY_LISTINGS)

  const toggleAvail = id => setListings(ls => ls.map(l => l.id === id ? { ...l, available: !l.available } : l))

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1.25rem' }}>My Dashboard</h2>
      <div className="dash-tabs">
        {[['rentals', 'My Rentals'], ['listings', 'My Listings'], ['earnings', 'Earnings']].map(([key, label]) => (
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
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'listings' && (
        <div>
          {listings.map(l => (
            <div key={l.id} className="listing-card">
              <div className="listing-info">
                <h4>{l.item}</h4>
                <p>Total earned: ₹{l.earnings} · {l.bookings} bookings</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{l.available ? 'Available' : 'Unavailable'}</span>
                <button className={`toggle-btn${l.available ? ' on' : ''}`} onClick={() => toggleAvail(l.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'earnings' && (
        <div>
          <div className="stats-row">
            {[['₹7,200', 'Total Earned'], ['2', 'Items Listed'], ['5', 'Rentals Completed']].map(([val, label]) => (
              <div key={label} className="stat-card">
                <div className="stat-value">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Monthly Earnings (₹)</h3>
            <div className="bar-chart">
              {MONTHS.map((m, i) => (
                <div key={m} className="bar-wrap">
                  <span className="bar-val">₹{EARNINGS[i]}</span>
                  <div className="bar" style={{ height: `${(EARNINGS[i] / MAX) * 100}px`, background: i === 5 ? 'var(--amber)' : 'var(--green)' }} />
                  <span className="bar-label">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
