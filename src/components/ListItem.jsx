import React, { useState } from 'react'
import { CATEGORIES } from '../data'

const empty = { name: '', category: '', description: '', price: '', deposit: '', startDate: '', endDate: '' }

export default function ListItem({ showToast }) {
  const [form, setForm] = useState(empty)
  const fileRef = React.useRef()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = e => {
    e.preventDefault()
    showToast('🎉 Item listed successfully!')
    setForm(empty)
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>List an Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input required placeholder="e.g. Mountain Bike" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select required value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select category</option>
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea required placeholder="Describe your item, condition, what's included..." value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price / Day (₹)</label>
              <input required type="number" min="1" placeholder="e.g. 150" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Security Deposit (₹)</label>
              <input required type="number" min="0" placeholder="e.g. 500" value={form.deposit} onChange={e => set('deposit', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Available From</label>
              <input required type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Available Until</label>
              <input required type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Item Photo</label>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => set('photo', e.target.files[0]?.name || '')} />
            <div className="upload-btn" onClick={() => fileRef.current.click()}>
              📷 {form.photo || 'Click to upload image'}
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            List Item →
          </button>
        </form>
      </div>
    </div>
  )
}
