import React, { useState } from 'react'

const REVIEWS = [
  { author: 'Neha T.', rating: 5, text: 'Absolutely perfect condition! Owner was super responsive and the item was exactly as described.' },
  { author: 'Rohan M.', rating: 4, text: 'Great experience overall. Minor wear but works perfectly. Would rent again.' },
  { author: 'Aisha K.', rating: 5, text: 'Seamless pickup and return. Saved me so much money compared to buying!' },
  { author: 'Siddharth P.', rating: 4, text: 'Good quality item. The owner was punctual and very helpful.' },
]

function Stars({ rating }) {
  return <span className="stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
}

export default function ItemDetail({ item, onBack, onBook, onWishlist, inWishlist }) {
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState('')
  const [activeThumb, setActiveThumb] = useState(0)

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000))
    : 0

  const rent = days * item.price
  const platformFee = Math.round(rent * 0.05)
  const total = rent + item.deposit + platformFee

  const thumbs = [item.image, item.image, item.image]

  return (
    <div className="page">
      <button className="detail-back" onClick={onBack}>← Back to Browse</button>
      <div className="detail-layout">
        <div className="detail-gallery">
          <img src={thumbs[activeThumb]} alt={item.name} />
          <div className="thumb-row">
            {thumbs.map((src, i) => (
              <img key={i} src={src} className={`thumb${activeThumb === i ? ' active' : ''}`} onClick={() => setActiveThumb(i)} alt="" />
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h2>{item.name}</h2>
          <div className="detail-price">₹{item.price}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/day</span></div>
          <div className="detail-deposit">Security deposit: ₹{item.deposit} (refundable)</div>
          <p className="detail-desc">{item.description}</p>

          <div className="owner-card">
            <div className="owner-avatar">{item.owner[0]}</div>
            <div>
              <div className="owner-name">{item.owner}</div>
              <div className="stars" style={{ fontSize: '0.82rem' }}>{'★'.repeat(Math.floor(item.rating))} {item.rating} · {item.reviews} reviews</div>
              <div className="verified">✔ Verified Owner</div>
            </div>
          </div>

          <div className="date-row">
            <div className="date-field">
              <label>Start Date</label>
              <input type="date" min={today} value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="date-field">
              <label>End Date</label>
              <input type="date" min={startDate || today} value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>

          {days > 0 && (
            <div className="total-cost">
              {days} day{days > 1 ? 's' : ''} · Rent ₹{rent} + Deposit ₹{item.deposit} + Fee ₹{platformFee} = <strong>₹{total}</strong>
            </div>
          )}

          <button className="btn-primary" onClick={() => days > 0 && onBook({ item, days, rent, platformFee, total, startDate, endDate })}>
            Book Now
          </button>
          <button className="btn-secondary" onClick={() => onWishlist(item)}>
            {inWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <span className="review-author">{r.author}</span>
              <Stars rating={r.rating} />
            </div>
            <p className="review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
