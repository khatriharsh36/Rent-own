# Future Plans & Ideas

A living document of planned features, improvements, and long-term ideas for Rent & Own.

---

## 🔧 Short-Term (Next Sprint)

### Real Authentication
- Replace demo credentials with a proper auth flow (JWT or session-based)
- Sign up page with email verification
- Password reset flow
- Persist login state via `localStorage` or cookies

### Backend & Database
- REST API or GraphQL backend (Node.js + Express or Next.js API routes)
- Database for users, items, bookings, reviews (PostgreSQL or MongoDB)
- Replace all mock `data.js` with real API calls using `fetch` / `axios` / React Query

### Image Upload
- Connect the file picker in List Item to a real storage service (AWS S3 or Cloudinary)
- Show image preview before submitting
- Support multiple images per listing

### Form Validation
- Add client-side validation feedback (inline errors, not just `required`)
- Prevent booking end date before start date
- Validate deposit and price are positive numbers

---

## 🚀 Medium-Term

### Real-Time Notifications
- WebSocket or Server-Sent Events for live booking request alerts
- Push notifications (browser Notification API)
- Notification preferences (email / in-app toggle)

### Messaging System
- In-app chat between rentee and renter before/after booking
- Message thread per booking
- Unread message badge in navbar

### Maps & Location
- Integrate Google Maps or Mapbox to show item locations on a map
- Distance calculated from user's real GPS location
- Map view toggle on the browse page alongside the grid view

### Reviews & Ratings
- Persist submitted reviews to the backend
- Display reviews on item detail page dynamically
- Two-way reviews — renter can also review the rentee
- Aggregate rating recalculation after new review

### Advanced Search & Filters
- Full-text search with fuzzy matching
- Filter by availability date range
- Filter by distance radius (e.g. within 1 km / 5 km)
- Saved search / filter presets

### Booking Management
- Cancellation flow with configurable refund policy
- Booking extension requests
- Calendar view showing item availability
- iCal / Google Calendar export for active rentals

---

## 💡 Long-Term Ideas

### Trust & Safety
- ID verification for renters and rentees (Aadhaar / government ID upload)
- Item condition photos required at pickup and return
- Damage dispute resolution flow
- Insurance integration for high-value items

### Payments
- Real payment gateway integration (Razorpay, Stripe, or PayU)
- Automatic deposit refund after successful return
- Split payment support
- Earnings withdrawal to bank account for renters

### Social & Community
- Follow other users / see their listings
- Community feed — recent activity, new listings nearby
- Referral program (invite friends, earn credits)
- Verified community groups (e.g. college campus, apartment complex)

### Mobile App
- React Native app sharing business logic with the web app
- Offline support for browsing cached listings
- QR code scan for item pickup/return confirmation

### AI Features
- Smart price suggestions based on category and demand
- AI-generated item descriptions from a photo
- Fraud detection on listings and bookings
- Personalized item recommendations based on rental history

### Analytics Dashboard (Admin)
- Platform-wide stats: total bookings, GMV, active users
- Item category performance
- Geographic heatmap of activity
- Churn and retention metrics

### Sustainability Angle
- CO₂ saved counter (renting vs buying new)
- Eco-score badge for frequently rented items
- Gamification — "Green Renter" badges for active community members

---

## 🛠️ Technical Improvements

| Area | Idea |
|------|------|
| State Management | Migrate to Zustand or React Context + useReducer for shared state |
| Routing | Add React Router for proper URL-based navigation and deep linking |
| Testing | Unit tests with Vitest + React Testing Library; E2E with Playwright |
| Accessibility | ARIA labels, keyboard navigation, focus traps in modals |
| Performance | Lazy load routes, virtualize long item lists (TanStack Virtual) |
| PWA | Service worker + manifest for installable app + offline support |
| i18n | Multi-language support (Hindi, Tamil, etc.) using `react-i18next` |
| Dark Mode | CSS variable swap + `prefers-color-scheme` media query support |
| Error Boundaries | Graceful error UI for component crashes |
| CI/CD | GitHub Actions pipeline: lint → test → build → deploy to Vercel/Netlify |
