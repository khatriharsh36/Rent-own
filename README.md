# Rent & Own

A community-based peer-to-peer rental marketplace built with React + Vite. Users can browse, rent, and list items within their local community — think bikes, gadgets, books, tools, and more.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Plain CSS (custom properties) |
| Fonts | Google Fonts — Playfair Display, DM Sans |
| State | React `useState` / `useMemo` (no external store) |

---

## Project Structure

```
rent&own2/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top nav with notifications dropdown
│   │   ├── Login.jsx           # Role-based login (Rentee / Renter)
│   │   ├── ItemCard.jsx        # Browse grid card
│   │   ├── ItemDetail.jsx      # Full item view + booking dates + wishlist
│   │   ├── BookingModal.jsx    # Payment confirmation modal
│   │   ├── ListItem.jsx        # Renter form to list a new item
│   │   ├── RenteeDashboard.jsx # Rentee: rentals, wishlist, spending chart
│   │   ├── RenterDashboard.jsx # Renter: booking requests, listings, earnings
│   │   └── Dashboard.jsx       # Legacy dashboard (unused)
│   ├── App.jsx                 # Root — routing, shared state (wishlist, toast)
│   ├── data.js                 # Mock data: items, categories, rentals, listings
│   ├── index.css               # Global styles + CSS variables
│   └── main.jsx                # React DOM entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Rentee (borrow items) | rentee@demo.com | rentee123 |
| Renter (lend items) | renter@demo.com | renter123 |

Use the **Auto-fill** button on the login screen for quick access.

---

## Features

### Browse
- Live search by item name
- Filter by category (pills + sidebar checkboxes)
- Price range slider (up to ₹400/day)
- Sort by distance, price, or rating
- Animated item cards with availability badges

### Item Detail
- Image gallery with thumbnail switcher
- Dynamic rental cost calculator (rent + deposit + 5% platform fee)
- Add to / remove from wishlist (persisted in App state)
- Book Now → opens payment confirmation modal

### Booking Modal
- Order summary breakdown
- Payment method selector (UPI / Card / Wallet)
- Booking confirmation screen with generated booking ID

### Rentee Dashboard
- My Rentals — status badges (Active / Pending / Completed), countdown timer
- Leave Review — star rating modal, marks as reviewed after submit
- Wishlist — remove items or jump straight to Book Now
- Spending — monthly bar chart + category breakdown

### Renter Dashboard
- Booking Requests — Accept / Decline pending requests
- My Listings — availability toggle, Add New Listing button
- Earnings — monthly bar chart + top performing items

### Navbar
- Role-aware navigation links
- Notifications dropdown — unread count badge, clears on open
- Logout

### List Item (Renter only)
- Full form: name, category, description, price, deposit, availability dates
- Image upload via file picker (shows selected filename)
- Toast confirmation on submit

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
