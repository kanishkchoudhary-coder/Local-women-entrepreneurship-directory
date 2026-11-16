# HerLocal

**Local Women Entrepreneurship Directory**  
CA1 web development project · HTML, CSS, JavaScript

HerLocal is a responsive website designed to make women-led local businesses easier to discover. It brings business profiles, categories, locations, products, indicative pricing and availability into a simple browsing experience.

## The problem

Small businesses can be difficult to find when their information is fragmented across listings and social platforms. HerLocal organizes key details in one searchable directory and provides a structured process for adding and reviewing listings.

## Key features

- Searchable business directory with category and city filters.
- Detailed business profiles with products, prices, opening hours and availability.
- Submission form with pending, approved and rejected listing states.
- Contact inquiry form and local inquiry inbox.
- Customer feedback, review reporting and moderation workflow.
- Responsive layout and accessible profile dialogs.

## Technology

| Technology | Responsibility |
| --- | --- |
| HTML | Semantic page structure, navigation and forms |
| CSS | Visual design, responsive layout and interaction states |
| JavaScript | Directory rendering, filtering, forms, storage and moderation |

## Project files

- `index.html` — page structure and forms
- `css/style.css` — visual styles
- `js/data.js` — illustrative listings and reviews
- `js/app.js` — website behavior

## Data and functionality notes

The included business names, product information and reviews are **illustrative sample records**; images are illustrative stock photographs, not representations of actual participating businesses. The website does not independently verify business ownership.

Submissions, reviews, inquiries and moderation decisions are saved using browser `localStorage`. Records are **not shared across visitors or devices**, and the inquiry form **does not send messages**. The review workspace is publicly accessible and does not have authenticated access control. These limitations are important when evaluating the current implementation.

## Photography

Illustrative photography is provided via [Pexels](https://www.pexels.com/) subject to the [Pexels License](https://www.pexels.com/license/). Image sources are referenced in the project files.
