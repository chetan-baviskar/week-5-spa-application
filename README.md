# Week 5 — PageTurn Single Page Application (SPA)

A small responsive SPA built using HTML, CSS and vanilla JavaScript.

## Project files
- `index.html` — the persistent app shell and navigation.
- `style.css` — responsive layout, cards, themes and reduced-motion support.
- `script.js` — hash router, dynamic views, search, category filters, saved library and form validation.
- `REPORT.md` — implementation and testing report.

## Run the app
Open `index.html` in a modern browser. Use the navigation to switch between Home, Discover, My Library and About. The app uses hash routes such as `#/discover` so navigation does not reload the full page.

## SPA features
- Client-side hash routing with `hashchange`.
- Dynamic page content rendering.
- Search books by title, author, category or description.
- Filter by Fiction, Wellness and Technology.
- Add/remove books from My Library.
- Persist library and theme preferences with localStorage.
- Mobile navigation, accessible labels and keyboard focus styles.
- Empty states and inline form validation.
- Responsive design and reduced-motion support.

All book data is sample content stored in `script.js`; no external API or backend is required. The demo contact form validates input locally and does not send data.
