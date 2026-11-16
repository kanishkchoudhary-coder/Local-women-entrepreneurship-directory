// Feature 1: display fictional listings, search/filter them and open a profile.
// Each listing's data lives in data.js; no database is used in this prototype.
const $ = selector => document.querySelector(selector);
const grid = $("#business-grid");
const search = $("#search");
const category = $("#category");
const city = $("#city");
const dialog = $("#profile-dialog");
const rupees = price => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(price);

// textContent treats listing details as text, not executable HTML.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Build filter options from the data so categories/cities stay synchronized.
function addOptions(select, field) {
  [...new Set(businesses.map(b => b[field]))].sort().forEach(value => {
    const option = element("option", "", value);
    option.value = value;
    select.append(option);
  });
}

function createCard(business) {
  const card = element("article", "business-card");
  const image = element("img", "card-image");
  image.src = business.image;
  image.alt = `Illustrative ${business.category} image`;
  image.loading = "lazy";
  const body = element("div", "card-content");
  const place = element("p", "card-place", `${business.category} · ${business.city}`);
  const title = element("h3", "card-title", business.name);
  const tagline = element("p", "card-tagline", business.tagline);
  const bottom = element("div", "card-bottom");
  const prices = business.offerings.filter(item => item.price !== null).map(item => item.price);
  const from = element("strong", "", prices.length ? `From ${rupees(Math.min(...prices))}` : "Ask for quote");
  const button = element("button", "view-button", "View profile ↗");
  button.type = "button";
  button.setAttribute("aria-label", `View profile for ${business.name}`);
  button.addEventListener("click", () => openProfile(business));
  bottom.append(from, button);
  body.append(place, title, tagline, bottom);
  card.append(image, body);
  return card;
}

function render() {
  const query = search.value.trim().toLowerCase();
  const matches = businesses.filter(business => {
    const fields = [business.name, business.category, business.city, business.description,
      ...business.offerings.map(item => item.name)].join(" ").toLowerCase();
    return fields.includes(query)
      && (category.value === "all" || business.category === category.value)
      && (city.value === "all" || business.city === city.value);
  });
  grid.replaceChildren(...matches.map(createCard));
  $("#results-count").textContent = `${matches.length} businesses found`;
  $("#empty-state").hidden = matches.length > 0;
}

function openProfile(business) {
  const wrapper = element("div");
  const image = element("img", "profile-photo");
  image.src = business.image;
  image.alt = `Illustrative ${business.category} image`;
  const body = element("div", "profile-body");
  const label = element("p", "eyebrow", `${business.category} · ${business.city}`);
  const title = element("h2", "", business.name);
  title.id = "profile-title";
  const description = element("p", "profile-description", business.description);
  const facts = element("div", "profile-facts");
  [["Service area", `${business.area}, ${business.city}`], ["Hours", business.hours],
   ["Availability", business.availability]].forEach(([name, value]) => {
    const fact = element("div", "fact");
    fact.append(element("small", "", name), element("strong", "", value));
    facts.append(fact);
  });
  const offerings = element("ul", "offerings");
  business.offerings.forEach(item => {
    const row = element("li");
    const price = item.price === null ? "Ask for quote" : `From ${rupees(item.price)}`;
    row.append(element("span", "", item.name), element("strong", "", price));
    offerings.append(row);
  });
  body.append(label, title, description, facts, element("h3", "", "Products & services"),
    offerings, element("p", "profile-note", "Fictional demo listing · Not independently verified."));
  wrapper.append(image, body);
  $("#profile-content").replaceChildren(wrapper);
  dialog.showModal();
}

function clearFilters() {
  search.value = "";
  category.value = "all";
  city.value = "all";
  render();
}

addOptions(category, "category");
addOptions(city, "city");
search.addEventListener("input", render);
category.addEventListener("change", render);
city.addEventListener("change", render);
$("#filters").addEventListener("submit", event => event.preventDefault());
$("#clear").addEventListener("click", clearFilters);
$("#empty-reset").addEventListener("click", clearFilters);
$("#close-dialog").addEventListener("click", () => dialog.close());
render();
