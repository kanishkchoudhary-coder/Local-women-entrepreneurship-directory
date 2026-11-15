"use strict";
const demoBusinesses = [
  {id:1,name:"Gulabi Threads",category:"Clothing",city:"Jaipur",description:"Handcrafted scarves and everyday ethnic wear, made in small batches.",email:"gulabi@example.com",symbol:"🧵",type:"sample"},
  {id:2,name:"Bloom & Bake",category:"Food & Beverage",city:"Jaipur",description:"Custom celebration cakes and freshly baked treats.",email:"bloom@example.com",symbol:"🧁",type:"sample"},
  {id:3,name:"Mitti Studio",category:"Handmade",city:"Ahmedabad",description:"Decorative pottery, planters, and handmade home accents.",email:"mitti@example.com",symbol:"🏺",type:"sample"},
  {id:4,name:"Sakhi Wellness",category:"Beauty & Wellness",city:"Surat",description:"Beauty and self-care services with appointment inquiries.",email:"sakhi@example.com",symbol:"🌿",type:"sample"},
  {id:5,name:"Pixel Sparrow",category:"Services",city:"Bengaluru",description:"Branding, social media design, and creative business support.",email:"pixel@example.com",symbol:"🎨",type:"sample"},
  {id:6,name:"Noor Handmade",category:"Handmade",city:"Jaipur",description:"Handmade jewellery, gifts and accessories for special occasions.",email:"noor@example.com",symbol:"💍",type:"sample"}
];
const STORAGE_KEY="herlocal_approved_v1";
const PENDING_KEY="herlocal_pending_v1";
const REVIEW_KEY="herlocal_reviews_v1";
const $ = selector => document.querySelector(selector);
function load(key){try{const value=JSON.parse(localStorage.getItem(key));return Array.isArray(value)?value:[]}catch{return []}}
function save(key,items){localStorage.setItem(key,JSON.stringify(items))}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]))}
function allBusinesses(){return [...demoBusinesses,...load(STORAGE_KEY)]}
function populateFilters(){
  const businesses=allBusinesses();
  for(const [id,field] of [["category","category"],["city","city"]]){
    const select=$("#"+id),current=select.value;
    select.innerHTML=`<option value="all">All ${id==="city"?"cities":"categories"}</option>`;
    [...new Set(businesses.map(b=>b[field]))].sort().forEach(value=>{const o=document.createElement("option");o.value=value;o.textContent=value;select.append(o)});
    select.value=[...select.options].some(o=>o.value===current)?current:"all";
  }
}
function renderCards(){
  const query=$("#search").value.trim().toLowerCase(),category=$("#category").value,city=$("#city").value;
  const filtered=allBusinesses().filter(b=>(`${b.name} ${b.description} ${b.category} ${b.city}`.toLowerCase().includes(query))&&(category==="all"||b.category===category)&&(city==="all"||b.city===city));
  $("#resultCount").textContent=`${filtered.length} business${filtered.length===1?"":"es"}`;
  $("#emptyState").classList.toggle("hidden",filtered.length>0);
  $("#cards").innerHTML=filtered.map(b=>`<article class="business-card"><div class="card-art" aria-hidden="true">${escapeHTML(b.symbol)}</div><div class="card-body"><div class="card-meta"><span>${escapeHTML(b.category)}</span><span>📍 ${escapeHTML(b.city)}</span></div><h3>${escapeHTML(b.name)}</h3><p>${escapeHTML(b.description)}</p><div class="card-actions"><button class="button" type="button" data-view="${b.id}">View details</button><span class="sample">${b.type==="sample"?"Fictional sample":"Demo-approved listing"}</span></div></div></article>`).join("");
}
function renderPending(){
 const items=load(PENDING_KEY);
 $("#pending").innerHTML=items.length?items.map(b=>`<div class="pending-row"><div><strong>${escapeHTML(b.name)}</strong><div>${escapeHTML(b.city)} · ${escapeHTML(b.category)} · ${escapeHTML(b.email)}</div></div><div><button class="button small" data-approve="${b.id}">Approve</button><button class="button secondary small" data-reject="${b.id}">Reject</button></div></div>`).join(""):"<p>No pending suggestions.</p>";
}
function viewBusiness(id){
 const b=allBusinesses().find(x=>String(x.id)===String(id));if(!b)return;
 const reviews=load(REVIEW_KEY).filter(r=>String(r.businessId)===String(id));
 $("#dialogBody").innerHTML=`<p class="eyebrow">${escapeHTML(b.category)} · ${escapeHTML(b.city)}</p><h2 id="dialogTitle">${escapeHTML(b.name)}</h2><p>${escapeHTML(b.description)}</p><p class="sample">${b.type==="sample"?"Fictional demonstration listing":"Submitted and approved only within this browser"}</p><p><a class="button" href="mailto:${encodeURIComponent(b.email)}?subject=${encodeURIComponent("Inquiry about "+b.name)}">Contact by email</a></p><h3>Demo reviews (${reviews.length})</h3><ul class="review-list">${reviews.map(r=>`<li><strong>${r.rating}/5</strong> — ${escapeHTML(r.comment)}</li>`).join("")||"<li>No reviews yet.</li>"}</ul><form class="review-form" id="reviewForm"><label>Rating <select name="rating" required><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label><label>Review <textarea name="comment" required minlength="3" maxlength="180" placeholder="Share a short demo review"></textarea></label><button class="button" type="submit">Post review locally</button></form>`;
 $("#reviewForm").addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget);const all=load(REVIEW_KEY);all.push({businessId:id,rating:Number(data.get("rating")),comment:String(data.get("comment")).trim()});save(REVIEW_KEY,all);viewBusiness(id)});
 $("#businessDialog").showModal();
}
$("#search").addEventListener("input",renderCards);
$("#category").addEventListener("change",renderCards);
$("#city").addEventListener("change",renderCards);
$("#clearFilters").addEventListener("click",()=>{$("#search").value="";$("#category").value="all";$("#city").value="all";renderCards()});
$("#cards").addEventListener("click",event=>{const button=event.target.closest("[data-view]");if(button)viewBusiness(button.dataset.view)});
$("#closeDialog").addEventListener("click",()=>$("#businessDialog").close());
$("#businessForm").addEventListener("submit",event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const data=new FormData(form),items=load(PENDING_KEY);
 const business={id:Date.now(),name:String(data.get("name")).trim(),category:String(data.get("category")),city:String(data.get("city")).trim(),email:String(data.get("email")).trim(),description:String(data.get("description")).trim(),symbol:"🏪",type:"demo"};
 items.push(business);save(PENDING_KEY,items);form.reset();$("#formStatus").textContent="Suggestion saved in this browser. Open Demo administration to review it.";renderPending();
});
$("#pending").addEventListener("click",event=>{
 const approval=event.target.closest("[data-approve]"),rejection=event.target.closest("[data-reject]");if(!approval&&!rejection)return;
 const id=(approval||rejection).dataset[approval?"approve":"reject"],pending=load(PENDING_KEY),found=pending.find(b=>String(b.id)===id);if(!found)return;
 if(approval){const accepted=load(STORAGE_KEY);accepted.push(found);save(STORAGE_KEY,accepted)}
 save(PENDING_KEY,pending.filter(b=>String(b.id)!==id));renderPending();populateFilters();renderCards();
});
populateFilters();renderCards(); renderPending();