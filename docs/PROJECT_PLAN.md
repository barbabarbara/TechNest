# TechNest – Prototype Implementation Plan

**Design:** original premium minimalist electronics shop, cloud white / graphite / soft blue with the group's green TechNest icon.

## Source tree

```text
TechNest/
├── index.html
├── pages/
│   ├── products.html
│   ├── product.html
│   ├── favorites.html
│   ├── cart.html
│   └── admin.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── api.js
│   ├── products.js
│   ├── product-details.js
│   ├── favorites.js
│   ├── cart.js
│   ├── admin.js
│   ├── storage.js
│   └── ui.js
├── assets/images/
│   ├── technest-logo.png
│   ├── technest-icon.png
│   └── technest-wordmark.png
├── README.md
├── ASSIGNMENT.md
├── PROJECT_PLAN.md
├── TASKS.md
└── .gitignore
```

## Proposed three-person ownership

| Developer | Ownership |
| --- | --- |
| Person 1 | Homepage, navigation, catalogue, responsive CSS |
| Person 2 | Product details, favourites, cart, localStorage |
| Person 3 | API layer, admin CRUD, error handling |

All group members jointly test and review code. Use feature branches and Pull Requests.

## Architecture

- `api.js`: electronics GET (four categories), POST, PUT and DELETE.
- `storage.js`: favourites, cart and local CRUD state.
- `ui.js`: navigation/footer, product card template, price formatter, accessible status messages and toast notifications.
- Individual page modules only implement page-specific behaviour.

## Limitation

DummyJSON does not persist POST/PUT/DELETE on its backend. This prototype overlays successful changes in localStorage to make CRUD effects visible when navigating between pages. The overlay is not a shared group database.
