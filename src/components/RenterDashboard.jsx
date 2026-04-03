import React, { useState } from 'react'
import { MY_LISTINGS } from '../data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const EARNINGS = [800, 1200, 600, 1800, 1400, 2100, 900]
const MAX = Math.max(...EARNINGS)

const REQUESTS = [
  { id: 1, item: 'Power Drill Set', rentee: 'Neha T.', start: '2025-07-22', end: '2025-07-25', days: 3, total: 240, status: 'Pending' },
  { id: 2, item: 'Camping Tent (4-person)', rentee: 'Rohan M.', start: '2025-07-28', end: '2025-08-01', days: 4, total: 600, status: 'Pending' },
  { id: 3, item: 'Power Drill Set', rentee: 'Aisha K.', start: '2025-06-10', end: '2025-06-12', days: 2, total: 160, status: 'Completed' },
]

export default function RenterDashboard({ user, onListItem }) {
  const [tab, setTab] = useState('requests')
  const [listings, setListings] = useState(MY_LISTINGS)
  const [requests, setRequests] = useState(REQUESTS)

  const toggleAvail = id => setListings(ls => ls.map(l => l.id === id ? { ...l, available: !l.available } : l))
  const handleRequest = (id, action) => setRequests(rs => rs.map(r => r.id === id ? { ...r, status: action } : r))

  return (
    <div className="page">
      {/* Profile header */}
      <div className="dash-profile-header">
        <div className="dash-avatar renter-avatar">{user.initials}</div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>{user.name}</h2>
          <span className="role-tag renter-tag">🏷️ Renter / Lender</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="stats-row" style={{ marginBottom: '1.5rem' }}>
        {[['₹9,800', 'Total Earned'], ['2', 'Active Listings'], ['8', 'Completed Rentals'], ['2', 'Pending Requests']].map(([val, label]) => (
          <div key={label} className="stat-card">
            <div className="stat-value" style={{ fontSize: val.length > 4 ? '1.5rem' : '2rem' }}>{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="dash-tabs">
        {[['requests', '📬 Booking Requests'], ['listings', '📋 My Listings'], ['earnings', '💰 Earnings']].map(([key, label]) => (
          <button key={key} className={`dash-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'requests' && (
        <div>
          {requests.map(r => (
            <div key={r.id} className="rental-card">
              <div className="rental-info">
                <h4>{r.item}</h4>
                <p>Requested by: <strong>{r.rentee}</strong> · {r.start} → {r.end} ({r.days} days)</p>
                <p>Payout: <strong style={{ color: 'var(--green)' }}>₹{r.total}</strong></p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                {r.status === 'Pending' ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn-primary"
                      style={{ width: 'auto', padding: '0.4rem 0.9rem', fontSize: '0.82rem', marginBottom: 0 }}
                      onClick={() => handleRequest(r.id, 'Accepted')}
                    >✓ Accept</button>
                    <button
                      className="btn-secondary"
                      style={{ width: 'auto', padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                      onClick={() => handleRequest(r.id, 'Declined')}
                    >✕ Decline</button>
                  </div>
                ) : (
                  <span className={`status-badge ${r.status === 'Accepted' ? 'Active' : r.status === 'Declined' ? 'Declined' : 'Completed'}`}>
                    {r.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'listings' && (
        <div>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '0.6rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}
            onClick={onListItem}
          >+ Add New Listing</button>
          {listings.map(l => (
            <div key={l.id} className="listing-card">
              <div className="listing-info">
                <h4>{l.item}</h4>
                <p>Total earned: <strong style={{ color: 'var(--green)' }}>₹{l.earnings}</strong> · {l.bookings} bookings</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{l.available ? 'Available' : 'Paused'}</span>
                <button className={`toggle-btn${l.available ? ' on' : ''}`} onClick={() => toggleAvail(l.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'earnings' && (
        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.25rem' }}>
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
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Top Performing Items</h3>
            {[['Power Drill Set', 1200, 3], ['Camping Tent (4-person)', 900, 2]].map(([name, earned, bookings]) => (
              <div key={name} className="spend-row">
                <span style={{ flex: 1 }}>{name}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginRight: '1rem' }}>{bookings} bookings</span>
                <span style={{ fontWeight: 700, color: 'var(--green)' }}>₹{earned}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
