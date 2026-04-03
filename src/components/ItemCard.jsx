import React from 'react'

function Stars({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>{rating}</span>
    </span>
  )
}

export default function ItemCard({ item, index, onClick }) {
  return (
    <div
      className="item-card"
      style={{ animationDelay: `${index * 0.07}s` }}
      onClick={() => onClick(item)}
    >
      <img className="card-img" src={item.image} alt={item.name} loading="lazy" />
      <div className="card-body">
        <div className="card-title">{item.name}</div>
        <div className="card-price">₹{item.price}<span>/day</span></div>
        <div className="card-meta">
          <Stars rating={item.rating} />
          <span className={`badge ${item.available ? 'available' : 'rented'}`}>
            {item.available ? 'Available' : 'Rented'}
          </span>
        </div>
        <div className="card-distance">👤 {item.owner} &nbsp;·&nbsp; 📍 {item.distance} km away</div>
      </div>
    </div>
  )
}
