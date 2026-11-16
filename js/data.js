// Illustrative business listings for academic assessment; no real businesses are represented.
// Replace with authorized real business data only after permission and verification.
const businesses = [
  {
    id: "biz-001", name: "Sweet Bloom Bakery", category: "Food & Bakery", city: "Phagwara", area: "Model Town area",
    tagline: "Celebrations, baked with care", description: "A small made-to-order bakery offering custom cakes, cupcakes and dessert boxes for birthdays and everyday milestones.",
    image: "https://images.pexels.com/photos/7328591/pexels-photo-7328591.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Mon–Sat · 10:00 AM–6:00 PM", availability: "Made to order", updated: "Nov 2026",
    offerings: [{ name: "Birthday cakes", price: 450 }, { name: "Cupcake box", price: 240 }, { name: "Dessert box", price: 320 }]
  },
  {
    id: "biz-002", name: "Asha Threads", category: "Fashion & Tailoring", city: "Jalandhar", area: "Urban Estate",
    tagline: "Clothes made for your story", description: "Thoughtful tailoring, alterations and custom ethnic-wear designs with a focus on fit, comfort and everyday elegance.",
    image: "https://images.pexels.com/photos/6461169/pexels-photo-6461169.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Mon–Sat · 11:00 AM–7:00 PM", availability: "Accepting orders", updated: "Nov 2026",
    offerings: [{ name: "Clothing alterations", price: 150 }, { name: "Custom kurta stitching", price: 700 }, { name: "Embroidery", price: null }]
  },
  {
    id: "biz-003", name: "Little Flame Studio", category: "Home & Crafts", city: "Ludhiana", area: "Sarabha Nagar",
    tagline: "Hand-poured, slow-made candles", description: "Small-batch scented candles and personalized gift sets made for thoughtful celebrations and cozy spaces.",
    image: "https://images.pexels.com/photos/5933781/pexels-photo-5933781.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Tue–Sun · 11:00 AM–6:00 PM", availability: "Limited stock", updated: "Nov 2026",
    offerings: [{ name: "Scented candle", price: 299 }, { name: "Gift candle set", price: 699 }, { name: "Customized label", price: null }]
  },
  {
    id: "biz-004", name: "Noor Beads & Co.", category: "Jewellery", city: "Phagwara", area: "Civil Lines",
    tagline: "Little pieces, big meaning", description: "Handmade earrings, bracelets and accessories designed for gifting, celebrations and personal style.",
    image: "https://images.pexels.com/photos/5830198/pexels-photo-5830198.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Mon–Fri · 11:00 AM–5:00 PM", availability: "In stock", updated: "Nov 2026",
    offerings: [{ name: "Beaded earrings", price: 199 }, { name: "Charm bracelets", price: 249 }, { name: "Custom accessories", price: null }]
  },
  {
    id: "biz-005", name: "Earth & Ember Ceramics", category: "Home & Crafts", city: "Jalandhar", area: "Maqsudan area",
    tagline: "Everyday objects with character", description: "Hand-finished ceramics, mugs and tabletop pieces in earthy colours, made in small batches.",
    image: "https://images.pexels.com/photos/6611187/pexels-photo-6611187.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Wed–Sun · 10:00 AM–5:00 PM", availability: "Made to order", updated: "Nov 2026",
    offerings: [{ name: "Handmade mug", price: 450 }, { name: "Ceramic bowl", price: 550 }, { name: "Personalized pottery", price: null }]
  },
  {
    id: "biz-006", name: "Glow Ritual Studio", category: "Beauty & Wellness", city: "Ludhiana", area: "Model Town",
    tagline: "Personal care, thoughtfully done", description: "Occasion makeup and everyday beauty services tailored to individual preferences, with advance appointments.",
    image: "https://images.pexels.com/photos/8394923/pexels-photo-8394923.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Tue–Sun · 10:00 AM–7:00 PM", availability: "By appointment", updated: "Nov 2026",
    offerings: [{ name: "Party makeup", price: 1200 }, { name: "Hair styling", price: 500 }, { name: "Bridal consultation", price: null }]
  },
  {
    id: "biz-007", name: "Bright Steps Learning", category: "Education", city: "Phagwara", area: "Hargobind Nagar",
    tagline: "A little confidence, every lesson", description: "Small-group tutoring and creative learning sessions for school students, with a focus on practice and fundamentals.",
    image: "https://images.pexels.com/photos/6193138/pexels-photo-6193138.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Mon–Sat · 3:00 PM–7:00 PM", availability: "New batches open", updated: "Nov 2026",
    offerings: [{ name: "Maths tutoring", price: 800 }, { name: "English tutoring", price: 800 }, { name: "Study-skills workshop", price: null }]
  },
  {
    id: "biz-008", name: "Crafted By Mira", category: "Home & Crafts", city: "Jalandhar", area: "Rama Mandi",
    tagline: "Gifts with a handmade touch", description: "Thoughtful craft gifts, decorative candles and personalized hampers assembled in small batches.",
    image: "https://images.pexels.com/photos/6755793/pexels-photo-6755793.jpeg?auto=compress&cs=tinysrgb&w=900",
    hours: "Mon–Sat · 10:00 AM–5:00 PM", availability: "Accepting orders", updated: "Nov 2026",
    offerings: [{ name: "Gift hamper", price: 599 }, { name: "Handmade decor", price: 249 }, { name: "Custom gift box", price: null }]
  }
];

// Public examples for testing feedback. These are not real customer testimonials.
const sampleReviews = [
  { id: "sample-1", businessId: "biz-001", name: "Reviewer A", rating: 5, message: "The cake options are easy to compare. Including portion sizes would make choosing even easier." },
  { id: "sample-2", businessId: "biz-001", name: "Reviewer B", rating: 3, message: "The selection looks thoughtful, although clearer lead times would help with planning." },
  { id: "sample-3", businessId: "biz-002", name: "Reviewer C", rating: 4, message: "The alteration services are explained clearly. A size guide would be useful." },
  { id: "sample-4", businessId: "biz-008", name: "Reviewer D", rating: 4, message: "The gift sets are organized well across different price ranges." }
];
