# HerLocal

**Local Women Entrepreneurship Directory**  
Academic web development project · HTML, CSS and JavaScript

HerLocal helps visitors discover women-led businesses through organized profiles, offerings, location filters and customer feedback. The website separates browsing, business submissions and listing moderation into focused pages while sharing a consistent interface.

## Purpose

Small enterprises may have limited visibility and scattered information. HerLocal brings relevant details together to help visitors discover products and services, compare prices, find contact information and explore nearby businesses.

## Features

- **Explore (`index.html`)** — Directory, search, category and city filters, business profiles, inquiries and feedback.
- **List a Business (`owner.html`)** — Profile form with products, starting prices, operating hours and submission for review.
- **Review Workspace (`admin.html`)** — Approve or reject business applications, moderate reviews, and inspect saved inquiries.
- **Responsive design** — Shared styling, accessible forms and dialogs, and restrained motion.
- **Category-based imagery** — New and previously saved submissions display illustrative photos matching their category, drawn from the existing example records.

## Technologies

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure, accessible content and forms |
| CSS3 | Responsive layout, typography, photographs and interaction states |
| JavaScript | Listings, search, validation and moderation workflows |
| Browser localStorage | Persistence within a single browser |

## Source organization

- `index.html`, `owner.html`, `admin.html` — Separate page experiences
- `css/style.css` — Shared design system
- `js/data.js` — Illustrative directory records and example feedback
- `js/app.js` — Shared application logic with page-specific initialization

## Data and access limitations

Featured business names, offerings, prices, reviews and photographs are illustrative examples. They do not represent independently verified participating businesses. The website has no shared backend, account authentication or government-identity verification.

Submitted businesses, feedback, inquiries and moderation decisions are stored **only in the current browser**. They are not synchronized between visitors or devices, and saved inquiries are not delivered to business owners. The Review Workspace is openly accessible and does not provide secure administrator authorization.

## Photography

Business-card and page-header images use illustrative Pexels photography, not photos of verified HerLocal businesses. The eleven source links and available credits are documented in `assets/images/IMAGE_SOURCES.txt`; the images can be stored locally within `assets/images/` to keep the published site independent of third-party image delivery. The business cards retain their original online image URLs as fallbacks.
