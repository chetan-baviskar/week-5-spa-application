WEEK 5 TASK REPORT
Developing a Single Page Application (SPA) Simulation

Student: Chetan Baviskar
Internship: Frontend Web Developer Intern
Project: PageTurn — Reading Space SPA
Technologies: HTML5, CSS3 and Vanilla JavaScript

1. Objective
The objective of this task was to simulate a small single-page application that changes views and displays content dynamically without a full page reload. The project demonstrates client-side routing, DOM manipulation, state management, and integration of HTML, CSS, and JavaScript.

2. Project Overview
PageTurn is a sample reading discovery application. It provides Home, Discover, My Library, and About views. The user can browse a small catalog of books, search by title or author, filter by category, and save selected books to a personal library. The responsive interface includes a mobile navigation menu, a light/dark theme, and a demo form with validation.

3. Application Architecture
The HTML file contains the persistent application shell: the header, navigation, main application mount point, footer, and toast notification region. CSS is maintained separately in style.css and uses reusable variables, grid/flex layouts, responsive breakpoints, and theme styles. JavaScript is maintained in script.js. A small hash-based router reads the browser URL fragment and renders the appropriate view. The hashchange event allows browser back and forward navigation to switch views without a full document reload.

4. Dynamic Content and State Management
The sample book catalog is represented as an array of JavaScript objects. Reusable rendering functions generate book cards and page views. Search checks book titles, authors, categories, and descriptions. Category buttons filter the catalog by Fiction, Wellness, or Technology. The library view only displays saved book IDs. Add/remove actions update the UI and the navigation badge immediately. The saved library and theme preference are stored in localStorage when browser storage is available. Empty states are shown when a search returns no matches or the library is empty.

5. User Experience and Accessibility
The application uses semantic HTML, a skip-to-content link, labelled search and form controls, visible keyboard focus styles, accessible button names, aria-pressed states for filters and theme control, and aria-current for the active route. The mobile navigation updates aria-expanded. Toasts and form messages use live regions to communicate outcomes. CSS includes a reduced-motion preference. The layout adapts to mobile, tablet, and desktop widths.

6. Testing and Debugging
The following scenarios should be tested: load the home route; navigate between views; use browser back and forward; search for an existing and a nonexistent book; filter by each category; save and remove books; refresh and confirm saved library/theme persistence; open and close the mobile navigation; submit invalid and valid form values; and check layout at narrow screen widths. The implementation handles malformed or unavailable localStorage by falling back to an empty library or the default theme.

7. Challenges and Solutions
A key SPA challenge is updating the view without losing URL consistency. Hash-based routing and the hashchange listener provide simple navigation without a server-side router. Another challenge is keeping repeated UI behavior maintainable; shared functions render cards and update the library badge. Event delegation handles save buttons and filter actions from dynamically generated elements. Safe text escaping is used for values inserted into HTML attributes, and user form values are validated before feedback is shown.

8. Conclusion
This project demonstrates the core principles of a simple SPA: route changes, dynamic rendering, client-side state, filtering, search, and persistent preferences. It integrates HTML, CSS and JavaScript into a structured, responsive experience. Future improvements could include a real book API, user authentication, automated tests, and a backend for synchronized accounts.
