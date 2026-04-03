export const CATEGORIES = ['All', 'Books', 'Gadgets', 'Bikes', 'Tools', 'Furniture', 'Electronics']

export const ITEMS = [
  { id: 1, name: 'Mountain Bike', category: 'Bikes', price: 120, deposit: 500, owner: 'Arjun S.', rating: 4.8, reviews: 24, distance: 0.3, available: true, description: 'Well-maintained 21-speed mountain bike, perfect for campus commutes and weekend trails. Helmet included.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
  { id: 2, name: 'Canon DSLR Camera', category: 'Electronics', price: 350, deposit: 2000, owner: 'Priya M.', rating: 4.9, reviews: 31, distance: 0.7, available: true, description: 'Canon EOS 1500D with 18-55mm kit lens. Great for photography projects and events. Bag included.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop' },
  { id: 3, name: 'Engineering Textbook Set', category: 'Books', price: 20, deposit: 100, owner: 'Rahul K.', rating: 4.5, reviews: 12, distance: 0.2, available: false, description: 'Complete set of 2nd year engineering textbooks — Maths, Physics, Chemistry. Good condition.', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
  { id: 4, name: 'Power Drill Set', category: 'Tools', price: 80, deposit: 400, owner: 'Meena R.', rating: 4.7, reviews: 18, distance: 1.1, available: true, description: 'Bosch 18V cordless drill with full bit set. Perfect for home projects and repairs.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop' },
  { id: 5, name: 'Study Desk & Chair', category: 'Furniture', price: 60, deposit: 300, owner: 'Vikram T.', rating: 4.3, reviews: 9, distance: 0.5, available: true, description: 'Compact study desk with ergonomic chair. Ideal for short-term stays or exam season.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop' },
  { id: 6, name: 'iPad Pro 11"', category: 'Gadgets', price: 200, deposit: 1500, owner: 'Sneha L.', rating: 4.9, reviews: 42, distance: 0.4, available: true, description: 'iPad Pro with Apple Pencil and keyboard case. Great for presentations and digital notes.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop' },
  { id: 7, name: 'Acoustic Guitar', category: 'Electronics', price: 90, deposit: 600, owner: 'Dev P.', rating: 4.6, reviews: 15, distance: 0.9, available: false, description: 'Yamaha F310 acoustic guitar with carry bag and extra strings. Perfect for beginners.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop' },
  { id: 8, name: 'Camping Tent (4-person)', category: 'Tools', price: 150, deposit: 800, owner: 'Ananya B.', rating: 4.8, reviews: 27, distance: 1.4, available: true, description: 'Quechua 4-person waterproof tent. Easy setup, includes pegs and carry bag.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop' },
  { id: 9, name: 'Noise-Cancelling Headphones', category: 'Gadgets', price: 70, deposit: 500, owner: 'Kiran J.', rating: 4.7, reviews: 33, distance: 0.6, available: true, description: 'Sony WH-1000XM4 with 30hr battery. Ideal for study sessions and travel.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
  { id: 10, name: 'Portable Projector', category: 'Electronics', price: 180, deposit: 1000, owner: 'Riya S.', rating: 4.5, reviews: 20, distance: 0.8, available: true, description: 'Anker Nebula mini projector, 100" display, built-in speaker. Great for movie nights.', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop' },
]

export const MY_RENTALS = [
  { id: 1, item: 'Canon DSLR Camera', owner: 'Priya M.', start: '2025-07-10', end: '2025-07-15', status: 'Active', total: 1750 },
  { id: 2, item: 'iPad Pro 11"', owner: 'Sneha L.', start: '2025-06-20', end: '2025-06-25', status: 'Completed', total: 1000 },
  { id: 3, item: 'Mountain Bike', owner: 'Arjun S.', start: '2025-07-18', end: '2025-07-20', status: 'Pending', total: 240 },
]

export const MY_LISTINGS = [
  { id: 1, item: 'Power Drill Set', earnings: 1200, bookings: 3, available: true },
  { id: 2, item: 'Camping Tent (4-person)', earnings: 900, bookings: 2, available: false },
]
