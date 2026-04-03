import React, { useState } from 'react'

const DUMMY_USERS = {
  rentee: { email: 'rentee@demo.com', password: 'rentee123', name: 'Arjun Singh', initials: 'AS' },
  renter: { email: 'renter@demo.com', password: 'renter123', name: 'Priya Mehta', initials: 'PM' },
}

export default function Login({ onLogin }) {
  const [role, setRole] = useState('rentee')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fillDemo = () => {
    setEmail(DUMMY_USERS[role].email)
    setPassword(DUMMY_USERS[role].password)
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const user = DUMMY_USERS[role]
      if (email === user.email && password === user.password) {
        onLogin({ role, name: user.name, initials: user.initials })
      } else {
        setError('Invalid credentials. Use the demo fill button.')
      }
      setLoading(false)
    }, 700)
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          Rent <span>&</span> Own
        </div>
        <p className="login-tagline">Your community rental marketplace</p>

        {/* Role selector */}
        <div className="role-selector">
          <button
            className={`role-btn${role === 'rentee' ? ' active' : ''}`}
            onClick={() => { setRole('rentee'); setEmail(''); setPassword(''); setError('') }}
          >
            <span className="role-icon">🛒</span>
            <span className="role-label">I want to Rent</span>
            <span className="role-sub">Browse & borrow items</span>
          </button>
          <button
            className={`role-btn${role === 'renter' ? ' active' : ''}`}
            onClick={() => { setRole('renter'); setEmail(''); setPassword(''); setError('') }}
          >
            <span className="role-icon">🏷️</span>
            <span className="role-label">I want to Lend</span>
            <span className="role-sub">List & earn from items</span>
          </button>
        </div>

        {/* Demo hint */}
        <div className="demo-hint">
          <span>Demo: <strong>{DUMMY_USERS[role].email}</strong></span>
          <button className="demo-fill-btn" onClick={fillDemo}>Auto-fill</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email" required placeholder="Enter your email"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password" required placeholder="Enter your password"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : `Sign in as ${role === 'rentee' ? 'Rentee' : 'Renter'} →`}
          </button>
        </form>

        <p className="login-footer">
          No account needed — this is a demo app. Just use the auto-fill button.
        </p>
      </div>
    </div>
  )
}
