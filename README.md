# HerLocal — Local Women Entrepreneurship Directory

**University CA1 project · Feature 1: Business Directory & Profiles**

This is a small, frontend-only academic demonstration. It has **8 fictional women-led business listings**, a responsive homepage, keyword search, combined category/city filters, product/service previews and an accessible detail dialog.

**All business names, locations, prices, availability and descriptions are fictional.** The images are illustrative stock photographs and do not depict the stated businesses or imply endorsement. None of the listings is independently verified.

## Run locally

1. Open the repository folder in VS Code.
2. Install the optional **Live Server** extension, right-click `index.html`, and select **Open with Live Server**. Alternatively, double-click `index.html` to open it in a modern browser.
3. Search for `cake`, select `Phagwara`, or filter by `Home & Crafts`.
4. Click **View profile**; close with **×** or **Escape**.
5. Test filters together and the empty-results case.

## Project files

| File | Responsibility |
| --- | --- |
| `index.html` | Semantic page structure: navigation, hero, filters, cards container, dialog and footer |
| `css/style.css` | Layout, colours, typography, responsive rules and hover transitions |
| `js/data.js` | Fictional example business records; loaded first |
| `js/app.js` | Create cards, search/filter, open/close profile dialog |

## How to add a business

In `js/data.js`, add an object to the `businesses` array with a **unique** `id` and the same properties as the existing objects. The filter category and city dropdown options are built from the data automatically. Prices are numeric `price` values (not `"₹450"` text), or `null` if a quote is needed.

## GitHub Pages deployment (after merging into main)

Open repository **Settings → Pages → Build and deployment → Deploy from a branch**. Set **branch** to `main`, **folder** to `/(root)`, then **Save**. Keep the `index.html` file at repository root, and keep `css/style.css`, `js/data.js`, and `js/app.js` as relative paths. Verify the live site on mobile and desktop.

## Known limitations and next features

- No secure login, shared database, authenticated admin or actual verification.
- Search/filter/profile are working; registration, inquiry, reviews and admin moderation are **not yet implemented**.
- Photos load from Pexels CDN and need an internet connection; cards have a gradient background fallback.
- No real phone number or personal address is provided; do not invent contact information for fictional listings.

## Photography credits

Photos are used as **illustrations**, not proof of business ownership or products. Sources, under the [Pexels licence](https://www.pexels.com/license/):

- [Cake and cupcakes](https://www.pexels.com/photo/birthday-cake-and-cupcakes-on-table-7328591/)
- [Sewing and tailoring](https://www.pexels.com/photo/hands-inserting-the-thread-in-the-needle-6461169/)
- [Candles](https://www.pexels.com/photo/white-candles-on-the-table-5933781/)
- [Jewellery](https://www.pexels.com/photo/earrings-beside-a-jewelry-box-5830198/)
- [Ceramic pottery](https://www.pexels.com/photo/close-up-of-handmade-ceramic-pottery-on-shelf-6611187/)
- [Makeup](https://www.pexels.com/photo/makeup-brushes-and-palette-8394923/)
- [Stationery](https://www.pexels.com/photo/composition-of-spiralnotebook-with-pencils-6193138/)
- [Candle-maker / hero image](https://www.pexels.com/photo/woman-in-an-apron-sitting-at-the-table-with-a-bunch-of-handmade-candles-6755793/)

## Viva practice

- Explain how `index.html` loads the two JavaScript files with `defer`.
- Explain object vs array; point to one business and its `offerings`.
- Demonstrate changing a price, adding a business, and filtering by city.
- Explain `querySelector`, `createElement`, `textContent`, `addEventListener`, `filter`, `replaceChildren`, and `showModal`.
- Explain why static GitHub Pages cannot offer secure owner accounts or shared moderation alone.
