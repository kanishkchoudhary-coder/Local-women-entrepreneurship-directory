// Feature 1: render fictional business listings, filter them, and open profiles.
// The business information lives in data.js, which loads before this file.

const grid = document.querySelector("#business-grid");
const count = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const cityFilter = document.querySelector("#city-filter");
const dialog = document.querySelector("#profile-dialog");
const profileContent = document.querySelector("#profile-content");

// Browsers recognize this language-region pair for INR formatting.
const rupees = amount => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(amount);

// Populate filter options from data, so we do not maintain two category lists.
function fillOptions(select, values) {
  [...new Set(values)].sort().forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

// Building elements with textContent avoids treating business names as HTML code.
function createCard(business) {
  const card = document.createElement("article");
  card.className = "business-card";

  const imageArea = document.createElement("div");
  imageArea.className = "card-image-area";
  const image = document.createElement("img");
  image.src = business.image;
  image.alt = `Illustrative photograph for ${business.category}`;
  image.loading = "lazy";
  image.addEventListener("error", () => image.classList.add("image-unavailable"));
  imageArea.append(image);

  const category = document.createElement("span");
  category.className = "category-pill";
  category.textContent = business.category;
  imageArea.append(category);

  const body = document.createElement("div");
  body.className = "card-body";
  const place = document.createElement("p");
  place.className = "card-place";
  place.textContent = `⌁  ${business.city} · ${business.area}`;

  const title = document.createElement("h3");
  title.textContent = business.name;
  const tagline = document.createElement("p");
  tagline.className = "card-tagline";
  tagline.textContent = business.tagline;

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const lowestPrice = Math.min(...business.offerings.filter(item => item.price !== null).map(item => item.price));
  const price = document.createElement("span");
  price.innerHTML = `<small>From</small> <strong>${rupees(lowestPrice)}</strong>`;
  const button = document.createElement("button");
  button.className = "view-button";
  button.type = "button";
  button.textContent = "View profile ↗";
  button.setAttribute("aria-label", `View profile for ${business.name}`);
  button.addEventListener("click", () => openProfile(business));
  bottom.append(price, button);
  body.append(place, title, tagline, bottom);
  card.append(imageArea, body);
  return card;
}

function renderBusinesses() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const city = cityFilter.value;
  const matches = businesses.filter(business => {
    const searchable = [
      business.name, business.category, business.city, business.area,
      business.description, ...business.offerings.map(item => item.name)
    ].join(" ").toLowerCase();
    return searchable.includes(query)
      && (category === "all" || business.category === category)
      && (city === "all" || business.city === city);
  });

  // Replace children, rather than repeatedly appending duplicate cards.
  grid.replaceChildren(...matches.map(createCard));
  count.textContent = `${matches.length} ${matches.length === 1 ? "business" : "businesses"} found`;
  emptyState.hidden = matches.length !== 0;
}

// Use DOM nodes instead of injecting arbitrary listing text into innerHTML.
function labeledText(label, value) {
  const block = document.createElement("div");
  block.className = "detail-fact";
  const heading = document.createElement("span");
  heading.className = "detail-label";
  heading.textContent = label;
  const detail = document.createElement("strong");
  detail.textContent = value;
  block.append(heading, detail);
  return block;
}

function openProfile(business) {
  const wrapper = document.createElement("div");
  wrapper.className = "profile-wrapper";

  const photo = document.createElement("img");
  photo.className = "profile-photo";
  photo.src = business.image;
  photo.alt = `Illustrative photograph for ${business.category}`;
  photo.addEventListener("error", () => photo.classList.add("image-unavailable"));

  const content = document.createElement("div");
  content.className = "profile-text";
  const tag = document.createElement("p");
  tag.className = "eyebrow";
  tag.textContent = `${business.category} · ${business.city}`;
  const title = document.createElement("h2");
  title.id = "profile-title";
  title.textContent = business.name;
  const description = document.createElement("p");
  description.className = "profile-description";
  description.textContent = business.description;

  const facts = document.createElement("div");
  facts.className = "profile-facts";
  facts.append(
    labeledText("Service area", `${business.area}, ${business.city}`),
    labeledText("Business hours", business.hours),
    labeledText("Availability", business.availability),
    labeledText("Last updated", business.updated)
  );

  const offeringsTitle = document.createElement("h3");
  offeringsTitle.className = "offerings-title";
  offeringsTitle.textContent = "Products & services";
  const list = document.createElement("ul");
  list.className = "offerings-list";
  business.offerings.forEach(item => {
    const row = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = item.name;
    const price = document.createElement("strong");
    price.textContent = item.price === null ? "Ask for quote" : `From ${rupees(item.price)}`;
    row.append(name, price);
    list.append(row);
  });

  const note = document.createElement("p");
  note.className = "profile-note";
  note.textContent = "Demo listing · Not independently verified. Contact inquiries and reviews are planned in the next features.";
  content.append(tag, title, description, facts, offeringsTitle, list, note);
  wrapper.append(photo, content);
  profileContent.replaceChildren(wrapper);
  dialog.showModal();
}

function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  cityFilter.value = "all";
  renderBusinesses();
  searchInput.focus();
}

fillOptions(categoryFilter, businesses.map(b => b.category));
fillOptions(cityFilter, businesses.map(b => b.city));
[searchInput, categoryFilter, cityFilter].forEach(input => {
  input.addEventListener(input === searchInput ? "input" : "change", renderBusinesses);
});
document.querySelector("#reset-filters").addEventListener("click", clearFilters);
document.querySelector("#empty-reset").addEventListener("click", clearFilters);
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#filters").addEventListener("submit", event => event.preventDefault());
renderBusinesses();
