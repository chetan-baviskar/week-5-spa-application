const app = document.querySelector("#app");
const toastNode = document.querySelector("#toast");
const libraryBadge = document.querySelector("#libraryBadge");
let toastTimer;
let currentFilter = "All";
let currentSearch = "";
const books = [
 {id:1,title:"The Quiet Chapter",author:"Maya Ellis",category:"Fiction",description:"A thoughtful story about starting over, finding courage, and the small moments that change us.",cover:"QUIET CHAPTER",style:"violet"},
 {id:2,title:"A Mindful Morning",author:"Noah Bennett",category:"Wellness",description:"Gentle, practical ideas for building a calmer routine and making space for what matters.",cover:"MINDFUL MORNING",style:"mint"},
 {id:3,title:"Designing Tomorrow",author:"Ava Brooks",category:"Technology",description:"Explore creative problem-solving, digital products, and the people-first side of technology.",cover:"DESIGN TOMORROW",style:"blue"},
 {id:4,title:"The Golden Hour",author:"Lena Parker",category:"Fiction",description:"A warm, character-led novel about friendship, second chances, and an unexpected journey.",cover:"GOLDEN HOUR",style:"gold"},
 {id:5,title:"Small Habits, Big Days",author:"Ethan Cole",category:"Wellness",description:"A clear guide to turning tiny repeatable actions into routines that last.",cover:"SMALL HABITS",style:"peach"},
 {id:6,title:"Creative Code",author:"Iris Morgan",category:"Technology",description:"A beginner-friendly tour of how code, design, and curiosity come together to build useful things.",cover:"CREATIVE CODE",style:"rose"}
];
const routeNames = {home:"Home",discover:"Discover Books",library:"My Library",about:"About PageTurn"};
function getSaved() {
  try { return JSON.parse(localStorage.getItem("pageturn-library") || "[]").filter(id => books.some(book => book.id === id)); }
  catch (_) { return []; }
}
function saveSaved(ids) {
  try { localStorage.setItem("pageturn-library", JSON.stringify(ids)); } catch (_) {}
}
function toast(message) {
  toastNode.textContent = message;
  toastNode.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastNode.classList.remove("show"), 2300);
}
function updateBadge() { libraryBadge.textContent = getSaved().length; }
function getRoute() {
  const route = location.hash.replace(/^#\/?/, "").split("?")[0];
  return ["home","discover","library","about"].includes(route) ? route : "home";
}
function navigate(route) { location.hash = `/${route}`; }
function bookCard(book, saved) {
  const isSaved = saved.includes(book.id);
  return `<article class="book-card">
    <div class="cover ${book.style}" aria-label="${book.cover} cover artwork">${book.cover}</div>
    <h3>${book.title}</h3><p class="book-author">by ${book.author}</p>
    <p class="book-description">${book.description}</p>
    <div class="book-meta"><span class="tag">${book.category}</span>
    <button class="save-btn ${isSaved ? "saved" : ""}" type="button" data-save="${book.id}" aria-pressed="${isSaved}">${isSaved ? "✓ In library" : "+ Add to library"}</button></div>
  </article>`;
}
function visibleBooks() {
  const saved = getSaved();
  let list = books.filter(book => (currentFilter === "All" || book.category === currentFilter) &&
    `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase().includes(currentSearch.toLowerCase()));
  if (getRoute() === "library") list = list.filter(book => saved.includes(book.id));
  return list;
}
function renderHome() {
  const saved = getSaved();
  return `<div class="container">
    <section class="hero">
      <div><p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Find your next<br><span>great read.</span></h1>
      <p class="description">A little space for curious minds. Discover a book that fits your mood, save it to your library, and keep your reading journey moving—one page at a time.</p>
      <div class="actions"><a class="button primary" href="#/discover">Explore the library <span aria-hidden="true">↗</span></a><a class="button secondary" href="#/about">Our story</a></div></div>
      <div class="hero-visual" aria-label="Decorative illustration of three colorful books"><div class="floating-note note-one"><strong>✦ A fresh perspective</strong><small>Just one page away</small></div><div class="book-stack" aria-hidden="true"><div class="book">STORIES</div><div class="book">YOUR NEXT CHAPTER</div><div class="book">IDEAS</div></div><div class="floating-note note-two"><strong>♡ Your own library</strong><small>${saved.length} book${saved.length===1?"":"s"} saved so far</small></div></div>
    </section>
    <section class="stat-row" aria-label="Reading space statistics"><div class="stat"><strong>06</strong><span>Books to explore</span></div><div class="stat"><strong>${saved.length.toString().padStart(2,"0")}</strong><span>Books in your library</span></div><div class="stat"><strong>03</strong><span>Topics to discover</span></div></section>
    <section><div class="section-head"><div><p class="eyebrow">A FEW GOOD PLACES TO START</p><h2 class="section-title">Picked for <span>your curiosity.</span></h2><p class="section-subtitle">A small selection for your next quiet moment.</p></div><a class="button secondary" href="#/discover">View all books →</a></div>
      <div class="book-grid">${books.slice(0,3).map(book=>bookCard(book,saved)).join("")}</div>
    </section>
  </div>`;
}
function renderCatalog(route) {
  const library = route === "library";
  const saved = getSaved();
  const list = visibleBooks();
  return `<div class="container">
    <p class="eyebrow">${library ? "YOUR PERSONAL COLLECTION" : "BROWSE BY MOOD OR INTEREST"}</p>
    <div class="section-head"><div><h1 class="section-title">${library ? "My <span>library.</span>" : "Discover your next <span>read.</span>"}</h1><p class="section-subtitle">${library ? "The books you've saved for later." : "Search the collection or choose a topic to narrow it down."}</p></div>${library ? `<div class="library-summary"><span class="big-number">${saved.length}</span><p><strong>saved ${saved.length===1?"book":"books"}</strong><br>Your next read is waiting.</p></div>` : ""}</div>
    <div class="search-row"><label class="sr-only" for="bookSearch">Search books</label><input id="bookSearch" type="search" placeholder="Search by title, author, or topic…" value="${escapeAttr(currentSearch)}"></div>
    ${!library ? `<div class="filters" aria-label="Filter books by category">${["All","Fiction","Wellness","Technology"].map(cat=>`<button type="button" class="filter-btn ${currentFilter===cat?"active":""}" data-filter="${cat}" aria-pressed="${currentFilter===cat}">${cat}</button>`).join("")}</div>` : ""}
    <div class="book-grid" id="catalogGrid">${list.length ? list.map(book=>bookCard(book,saved)).join("") : `<div class="empty-state"><strong>${library ? "Your library is waiting for its first book." : "No books found."}</strong>${library ? "Explore the collection and choose a title to save." : "Try a different search term or category."}<br><a class="button primary" style="margin-top:14px" href="#/${library?"discover":"home"}">${library?"Discover books":"Back home"}</a></div>`}</div>
  </div>`;
}
function renderAbout() {
  return `<div class="container"><p class="eyebrow">A SMALL SPACE FOR BIG IDEAS</p><h1 class="section-title">Reading should feel <span>like an invitation.</span></h1><p class="section-subtitle" style="max-width:650px;line-height:1.9">PageTurn is a simple single-page application concept built to demonstrate client-side routing, dynamic content rendering, search, filters, and browser-based state management. It is a friendly example of how a website can feel like an app without reloading the whole page.</p>
    <div class="about-panel" style="margin-top:30px"><article class="info-card"><h3>What this demo does</h3><p>Browse a small sample catalog, search by title or author, filter by category, and save books to a personal library. Your saved list is stored locally in this browser.</p><ul><li>Hash-based navigation</li><li>Dynamic catalog rendering</li><li>Responsive layout</li><li>Local storage for saved books</li></ul></article><article class="info-card"><h3>How it is built</h3><p>The project uses semantic HTML, reusable CSS styles, and vanilla JavaScript. A small router reads the URL hash and renders the matching view without a full page reload.</p><ul><li>HTML5 and accessible labels</li><li>CSS Grid and Flexbox</li><li>Event delegation</li><li>Basic error and empty states</li></ul></article></div>
    <div class="contact-card"><h3 style="font:700 18px Manrope;margin:0">Try the demo form</h3><p class="section-subtitle">This form validates your details locally; it does not send data to a server.</p><form id="demoForm"><label for="demoName">Name</label><input class="form-control" id="demoName" required minlength="2" placeholder="Your name"><label for="demoEmail" style="display:block;font-size:11px;font-weight:700;margin:13px 0 6px">Email</label><input class="form-control" id="demoEmail" type="email" required placeholder="you@example.com"><button class="button primary" type="submit">Validate details ↗</button><p id="demoFeedback" class="form-message" aria-live="polite"></p></form></div>
  </div>`;
}
function escapeAttr(value) {
  return String(value).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
function render() {
  const route = getRoute();
  document.title = `${routeNames[route]} | PageTurn`;
  $$(".nav a").forEach(link => {
    const active = link.dataset.route === route;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  app.innerHTML = route === "home" ? renderHome() : route === "about" ? renderAbout() : renderCatalog(route);
  updateBadge();
  $("#mainNav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
  $("#menuToggle").setAttribute("aria-label", "Open navigation");
  $("#menuToggle").textContent = "☰";
  app.focus({preventScroll:true});
}
function rerenderCatalog() {
  const route = getRoute();
  if (route !== "discover" && route !== "library") return;
  const grid = $("#catalogGrid");
  if (grid) {
    const list = visibleBooks();
    const saved = getSaved();
    grid.innerHTML = list.length ? list.map(book=>bookCard(book,saved)).join("") : `<div class="empty-state"><strong>${route==="library"?"Your library is waiting for its first book.":"No books found."}</strong>${route==="library"?"Explore the collection and choose a title to save.":"Try a different search term or category."}<br><a class="button primary" style="margin-top:14px" href="#/${route==="library"?"discover":"home"}">${route==="library"?"Discover books":"Back home"}</a></div>`;
  }
  $$(".filter-btn").forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
}
window.addEventListener("hashchange", () => { currentSearch = ""; currentFilter = "All"; render(); });
document.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    const saved = getSaved();
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved,id];
    saveSaved(next);
    updateBadge();
    toast(next.includes(id) ? "Book saved to your library." : "Book removed from your library.");
    if (getRoute() === "home") render(); else rerenderCatalog();
    return;
  }
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) { currentFilter = filterButton.dataset.filter; rerenderCatalog(); }
});
document.addEventListener("input", event => {
  if (event.target.id === "bookSearch") {
    currentSearch = event.target.value;
    rerenderCatalog();
    const input = $("#bookSearch");
    if (input) { input.focus(); input.setSelectionRange(currentSearch.length,currentSearch.length); }
  }
});
document.addEventListener("submit", event => {
  if (event.target.id === "demoForm") {
    event.preventDefault();
    const name = $("#demoName").value.trim();
    const email = $("#demoEmail").value.trim();
    const feedback = $("#demoFeedback");
    if (name.length < 2) { feedback.textContent = "Please enter a name with at least two characters."; $("#demoName").focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { feedback.textContent = "Please enter a valid email address."; $("#demoEmail").focus(); return; }
    feedback.textContent = `Thanks, ${name}. Your details passed validation. This is a demo, so nothing was sent.`;
    toast("Form validated successfully.");
    event.target.reset();
  }
});
$("#themeToggle").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  $("#themeToggle").setAttribute("aria-pressed",String(dark));
  $("#themeToggle").textContent = dark ? "☾ Theme" : "◐ Theme";
  try { localStorage.setItem("pageturn-theme",dark?"dark":"light"); } catch (_) {}
  toast(`${dark?"Dark":"Light"} theme enabled.`);
});
try {
  if (localStorage.getItem("pageturn-theme")==="dark") {
    document.body.classList.add("dark");
    $("#themeToggle").setAttribute("aria-pressed","true");
    $("#themeToggle").textContent = "☾ Theme";
  }
} catch (_) {}
$("#menuToggle").addEventListener("click", () => {
  const open = $("#mainNav").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded",String(open));
  $("#menuToggle").setAttribute("aria-label",open?"Close navigation":"Open navigation");
  $("#menuToggle").textContent = open ? "×" : "☰";
});
render();
