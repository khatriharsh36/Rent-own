import React, { useState, useRef, useEffect } from 'react'

const NOTIFS = [
  { id: 1, text: 'Neha T. requested your Power Drill Set', time: '2m ago', read: false },
  { id: 2, text: 'Your booking for Canon DSLR is confirmed', time: '1h ago', read: false },
  { id: 3, text: 'Rohan M. left a review on your listing', time: '3h ago', read: true },
]

export default function Navbar({ page, setPage, user, onLogout }) {
  const isRenter = user?.role === 'renter'
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState(NOTIFS)
  const ref = useRef()

  const unread = notifs.filter(n => !n.read).length

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setShowNotifs(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))

  const links = [
    ['browse', '🔍 Browse'],
    ...(isRenter ? [['list', '➕ List Item']] : []),
    ['dashboard', '📊 Dashboard'],
  ]

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setPage('browse')}>
        Rent <span>&</span> Own
      </div>
      <div className="navbar-links">
        {links.map(([key, label]) => (
          <button key={key} className={`nav-btn${page === key ? ' active' : ''}`} onClick={() => setPage(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="navbar-right">
        <div ref={ref} style={{ position: 'relative' }}>
          <button className="notif-btn" onClick={() => { setShowNotifs(v => !v); if (!showNotifs) markAllRead() }}>
            🔔
            {unread > 0 && <span className="notif-badge">{unread}</span>}
          </button>
          {showNotifs && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 300,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 300,
            }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.9rem' }}>
                Notifications
              </div>
              {notifs.map(n => (
                <div key={n.id} style={{
                  padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)',
                  background: n.read ? 'transparent' : 'var(--green-pale)',
                  fontSize: '0.85rem',
                }}>
                  <div style={{ marginBottom: '0.2rem' }}>{n.text}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</div>
                </div>
              ))}
              {notifs.length === 0 && (
                <div style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No notifications</div>
              )}
            </div>
          )}
        </div>
        {user && (
          <>
            <span className={`nav-role-tag ${user.role}`}>
              {user.role === 'rentee' ? '🛒 Rentee' : '🏷️ Renter'}
            </span>
            <div className="avatar" title={user.name}>{user.initials}</div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
