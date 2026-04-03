import React, { useState } from 'react'

export default function BookingModal({ booking, onClose }) {
  const [payMethod, setPayMethod] = useState('UPI')
  const [confirmed, setConfirmed] = useState(false)
  const bookingId = 'RO-' + Math.random().toString(36).slice(2, 8).toUpperCase()

  if (!booking) return null

  const { item, days, rent, platformFee, total, startDate, endDate } = booking

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>

        {!confirmed ? (
          <>
            <h2>Confirm Booking</h2>
            <div className="order-row"><span>Item</span><span>{item.name}</span></div>
            <div className="order-row"><span>Rental Period</span><span>{startDate} → {endDate}</span></div>
            <div className="order-row"><span>Duration</span><span>{days} day{days > 1 ? 's' : ''}</span></div>
            <div className="order-row"><span>Rent</span><span>₹{rent}</span></div>
            <div className="order-row"><span>Security Deposit</span><span>₹{item.deposit}</span></div>
            <div className="order-row"><span>Platform Fee (5%)</span><span>₹{platformFee}</span></div>
            <div className="order-row"><span>Total Payable</span><span>₹{total}</span></div>

            <div className="payment-methods">
              {['UPI', 'Card', 'Wallet'].map(m => (
                <button key={m} className={`pay-btn${payMethod === m ? ' selected' : ''}`} onClick={() => setPayMethod(m)}>{m}</button>
              ))}
            </div>

            <button className="btn-primary" onClick={() => setConfirmed(true)}>
              Pay ₹{total} & Confirm
            </button>
          </>
        ) : (
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your rental has been booked successfully.</p>
            <div className="booking-id">Booking ID: <strong>{bookingId}</strong></div>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}
