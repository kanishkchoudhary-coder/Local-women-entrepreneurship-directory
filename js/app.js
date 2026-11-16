// Local records provide submission and moderation workflows without a backend.
const $ = selector => document.querySelector(selector);
const grid = $("#business-grid");
const dialog = $("#profile-dialog");
const money = value => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value);
const STORAGE_KEY = "herlocal-records-v1";
const emptyRecords = () => ({ applications: [], reviews: [], inquiries: [], hiddenReviews: [], reportedReviews: [] });
let activeBusiness = null;

function loadRecords() {
  try { return { ...emptyRecords(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return emptyRecords(); }
}
let records = loadRecords();

function saveRecords() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); return true; }
  catch { alert("Browser storage is unavailable. Use a local server and enable site storage."); return false; }
}

// textContent prevents user-entered descriptions from being interpreted as HTML.
function el(tag, className = "", text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function button(text, handler, className = "small-button") {
  const node = el("button", className, text);
  node.type = "button";
  node.addEventListener("click", handler);
  return node;
}
const publishedBusinesses = () => [...businesses, ...records.applications.filter(b => b.status === "published")];
const allReviews = () => [...sampleReviews, ...records.reviews];
const newId = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function fillSelect(select, values, allLabel) {
  const previous = select.value;
  select.replaceChildren();
  if (allLabel) select.append(new Option(allLabel, "all"));
  [...new Set(values)].sort().forEach(value => select.append(new Option(value, value)));
  if ([...select.options].some(option => option.value === previous)) select.value = previous;
}
function refreshSelects() {
  const listings = publishedBusinesses();
  for (const field of ["category", "city"]) {
    const values = listings.map(item => item[field]);
    fillSelect($("#" + field), values, `All ${field === "city" ? "cities" : "categories"}`);
    fillSelect($("#submit-" + field), businesses.map(item => item[field]));
  }
}
function card(business) {
  const wrapper = el("article", "business-card");
  const photo = el("img", "card-image");
  photo.src = business.image;
  photo.alt = `Illustrative ${business.category} photo`;
  photo.loading = "lazy";
  const body = el("div", "card-content");
  const lowest = business.offerings.map(x => x.price).filter(x => x !== null);
  const bottom = el("div", "card-bottom");
  bottom.append(el("strong", "", lowest.length ? `From ${money(Math.min(...lowest))}` : "Ask for quote"),
    button("View profile ↗", () => openProfile(business), "view-button"));
  body.append(el("p", "card-place", `${business.category} · ${business.city}`),
    el("h3", "card-title", business.name), el("p", "card-tagline", business.tagline), bottom);
  wrapper.append(photo, body);
  return wrapper;
}
function renderDirectory() {
  const q = $("#search").value.trim().toLowerCase();
  const matches = publishedBusinesses().filter(b => {
    const text = [b.name, b.category, b.city, b.area, b.description,
      ...b.offerings.map(item => item.name)].join(" ").toLowerCase();
    return text.includes(q) && ($("#category").value === "all" || b.category === $("#category").value)
      && ($("#city").value === "all" || b.city === $("#city").value);
  });
  grid.replaceChildren(...matches.map(card));
  $("#results-count").textContent = `${matches.length} ${matches.length === 1 ? "business" : "businesses"} found`;
  $("#empty-state").hidden = matches.length > 0;
}
function resetFilters() {
  $("#filters").reset();
  renderDirectory();
}

function openProfile(business) {
  activeBusiness = business;
  const content = el("div");
  const photo = el("img", "profile-photo");
  photo.src = business.image;
  photo.alt = `Illustrative ${business.category} photo`;
  const body = el("div", "profile-body");
  const title = el("h2", "", business.name);
  title.id = "profile-title";
  const facts = el("div", "profile-facts");
  [["Service area", `${business.area}, ${business.city}`], ["Opening hours", business.hours],
    ["Availability", business.availability]].forEach(([name, value]) => {
    const item = el("div", "fact");
    item.append(el("small", "", name), el("strong", "", value));
    facts.append(item);
  });
  const offerings = el("ul", "offerings");
  business.offerings.forEach(item => {
    const row = el("li");
    row.append(el("span", "", item.name), el("strong", "", item.price === null ? "Ask for quote" : `From ${money(item.price)}`));
    offerings.append(row);
  });
  body.append(el("p", "eyebrow", `${business.category} · ${business.city}`), title,
    el("p", "profile-description", business.description), facts,
    el("h3", "", "Products & services"), offerings,
    el("p", "profile-note", "Illustrative listing · Business identity has not been verified."));
  if (business.email) {
    const mail = el("a", "contact-link", "Open email application ↗");
    mail.href = `mailto:${encodeURIComponent(business.email)}?subject=${encodeURIComponent("Inquiry from HerLocal")}`;
    body.append(mail);
  }
  content.append(photo, body);
  $("#profile-content").replaceChildren(content);
  $("#inquiry-form").reset();
  $("#review-form").reset();
  $("#inquiry-status").textContent = "";
  $("#review-status").textContent = "";
  renderProfileReviews();
  dialog.showModal();
}
function renderProfileReviews() {
  const list = $("#reviews-list");
  const reviews = allReviews().filter(r => r.businessId === activeBusiness.id
    && (r.status === undefined || r.status === "published") && !records.hiddenReviews.includes(r.id));
  list.replaceChildren();
  if (!reviews.length) { list.append(el("p", "small-note", "No published feedback for this business yet.")); return; }
  reviews.forEach(review => {
    const item = el("article", "review-item");
    item.append(el("strong", "", `${review.name} · ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`),
      el("p", "", review.message),
      button("Report", () => {
        if (!records.reportedReviews.includes(review.id)) records.reportedReviews.push(review.id);
        if (saveRecords()) { renderWorkspace(); alert("Review reported for moderation in this browser."); }
      }, "mini-link"));
    list.append(item);
  });
}

$("#business-form").addEventListener("submit", event => {
  event.preventDefault();
  const f = new FormData(event.currentTarget);
  const name = f.get("name").trim();
  const business = {
    id: newId("biz"), name, category: f.get("category"), city: f.get("city"), area: f.get("area").trim(),
    tagline: f.get("offering").trim(), description: f.get("description").trim(),
    
image: businesses.find(b => b.category === f.get("category"))?.image
       || businesses[0].image,

    hours: f.get("hours").trim() || "Ask the business", availability: f.get("availability"),
    email: f.get("email").trim(), status: "pending",
    offerings: [{ name: f.get("offering").trim(), price: f.get("price") === "" ? null : Number(f.get("price")) }]
  };
  if (publishedBusinesses().some(b => b.name.toLowerCase() === name.toLowerCase())) {
    $("#submission-status").textContent = "A published listing already has this name.";
    return;
  }
  records.applications.push(business);
  if (saveRecords()) {
    event.currentTarget.reset();
    $("#submission-status").textContent = `"${name}" has been submitted for review. It is not visible in the directory yet.`;
    renderWorkspace();
  }
});

$("#inquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const f = new FormData(event.currentTarget);
  records.inquiries.unshift({ id: newId("inq"), businessId: activeBusiness.id,
    name: f.get("name").trim(), email: f.get("email").trim(), message: f.get("message").trim() });
  if (saveRecords()) {
    event.currentTarget.reset();
    $("#inquiry-status").textContent = "Inquiry saved on this device. It has not been sent to the business.";
    renderWorkspace();
  }
});

$("#review-form").addEventListener("submit", event => {
  event.preventDefault();
  const f = new FormData(event.currentTarget);
  records.reviews.push({ id: newId("rev"), businessId: activeBusiness.id, name: f.get("name").trim(),
    rating: Number(f.get("rating")), message: f.get("message").trim(), status: "pending" });
  if (saveRecords()) {
    event.currentTarget.reset();
    $("#review-status").textContent = "Review submitted for approval; it is not public yet.";
    renderWorkspace();
  }
});

// This open review workspace is not an authenticated admin area.
function workspaceRow(parent, heading, details, actions) {
  const row = el("div", "admin-row");
  row.append(el("strong", "", heading), el("p", "small-note", details));
  const controls = el("div", "admin-actions");
  actions.forEach(([label, handler]) => controls.append(button(label, handler)));
  row.append(controls);
  parent.append(row);
}
function renderWorkspace() {
  const pending = $("#admin-businesses");
  pending.replaceChildren();
  const applications = records.applications.filter(b => b.status === "pending");
  if (!applications.length) pending.append(el("p", "small-note", "No pending business submissions."));
  applications.forEach(b => workspaceRow(pending, b.name, `${b.category} · ${b.city} · ${b.description}`,
    [["Approve", () => setBusinessStatus(b, "published")], ["Reject", () => setBusinessStatus(b, "rejected")]]));

  const list = $("#admin-reviews");
  list.replaceChildren();
  const reviews = allReviews();
  if (!reviews.length) list.append(el("p", "small-note", "No reviews yet."));
  reviews.forEach(review => {
    const target = publishedBusinesses().find(b => b.id === review.businessId);
    const hidden = records.hiddenReviews.includes(review.id);
    const reported = records.reportedReviews.includes(review.id);
    const status = hidden ? "hidden" : review.status || "published";
    const actions = [];
    if (status === "pending") {
      actions.push(["Approve", () => setReviewStatus(review, "published")], ["Reject", () => setReviewStatus(review, "rejected")]);
    } else if (status === "published") {
      actions.push(["Hide", () => toggleHidden(review.id, true)]);
    } else if (hidden) {
      actions.push(["Restore", () => toggleHidden(review.id, false)]);
    }
    if (reported) actions.push(["Dismiss report", () => {
      records.reportedReviews = records.reportedReviews.filter(id => id !== review.id);
      if (saveRecords()) renderWorkspace();
    }]);
    workspaceRow(list, `${review.name} · ${target?.name || "Removed business"}`,
      `${"★".repeat(review.rating)} · ${status}${reported ? " · REPORTED" : ""} · ${review.message}`, actions);
  });

  const inbox = $("#admin-inquiries");
  inbox.replaceChildren();
  if (!records.inquiries.length) inbox.append(el("p", "small-note", "No saved inquiries yet."));
  records.inquiries.forEach(inquiry => {
    const business = publishedBusinesses().find(b => b.id === inquiry.businessId);
    workspaceRow(inbox, `${inquiry.name} → ${business?.name || "Business"}`,
      `${inquiry.email ? inquiry.email + " · " : ""}${inquiry.message}`, []);
  });
}
function setBusinessStatus(business, status) {
  business.status = status;
  if (saveRecords()) { refreshSelects(); renderDirectory(); renderWorkspace(); }
}
function setReviewStatus(review, status) {
  review.status = status;
  if (saveRecords()) { renderWorkspace(); if (activeBusiness && dialog.open) renderProfileReviews(); }
}
function toggleHidden(id, hidden) {
  records.hiddenReviews = hidden ? [...new Set([...records.hiddenReviews, id])]
    : records.hiddenReviews.filter(item => item !== id);
  records.reportedReviews = records.reportedReviews.filter(item => item !== id);
  if (saveRecords()) { renderWorkspace(); if (activeBusiness && dialog.open) renderProfileReviews(); }
}

$("#search").addEventListener("input", renderDirectory);
$("#category").addEventListener("change", renderDirectory);
$("#city").addEventListener("change", renderDirectory);
$("#filters").addEventListener("submit", event => event.preventDefault());
$("#clear").addEventListener("click", resetFilters);
$("#empty-reset").addEventListener("click", resetFilters);
$("#close-dialog").addEventListener("click", () => dialog.close());
$("#reset-data").addEventListener("click", () => {
  if (!confirm("Delete all locally saved submissions, reviews, reports and inquiries?")) return;
  records = emptyRecords();
  if (saveRecords()) { refreshSelects(); renderDirectory(); renderWorkspace(); }
});
refreshSelects();
renderDirectory();
renderWorkspace();
