# TechNest

**En modern elektronikbutik byggd med HTML, CSS och Vanilla JavaScript.**

> **Status:** Under utveckling · Grupparbete

TechNest är ett kursprojekt där vi bygger en responsiv e-handelswebbplats för elektronik. Produkterna hämtas från [DummyJSON Products API](https://dummyjson.com/docs/products). Webbplatsen ska erbjuda produktkatalog, sökning, kategorifilter, prissortering, favoriter, varukorg, simulerad kassa samt en administrationsvy för CRUD.

## Teknik

- HTML5 och semantisk markup
- CSS3 (responsiv layout)
- Vanilla JavaScript med ES-moduler och DOM-manipulation
- Fetch API med `async/await`, loading states och felhantering
- LocalStorage för favoriter och varukorg
- Git och GitHub för grupparbete

## Planerade funktioner

- [ ] Startsida med utvalda elektronikprodukter
- [ ] Produktkatalog med kombinerbar sökning, kategorifilter och prissortering
- [ ] Produktdetaljer
- [ ] Favoriter som sparas lokalt
- [ ] Varukorg med antal, totalbelopp och simulerad checkout
- [ ] Administrationsvy för Create, Read, Update, Delete via API
- [ ] Loading states och begripliga felmeddelanden för alla API-anrop
- [ ] Mobilmeny och responsiv design
- [ ] Tillgänglighet enligt relevanta krav i WCAG 2.2 AA
- [ ] Tidsstyrt bekräftelsemeddelande med `setTimeout()`

**Obs:** DummyJSON simulerar Create, Update och Delete. Ändringarna sparas inte permanent på API-servern.

## Planerade sidor

| Sida            | Fil                    | Syfte                               |
| --------------- | ---------------------- | ----------------------------------- |
| Startsida       | `index.html`           | Introduktion och utvalda produkter  |
| Produkter       | `pages/products.html`  | Katalog, sökning, filter, sortering |
| Produktdetaljer | `pages/product.html`   | Information om vald produkt         |
| Favoriter       | `pages/favorites.html` | Sparade produkter                   |
| Varukorg        | `pages/cart.html`      | Antal, total och simulerat köp      |
| Administration  | `pages/admin.html`     | CRUD-gränssnitt                     |

## Starta lokalt

När filerna är implementerade:

1. Klona projektet: `git clone git@github.com:barbabarbara/TechNest.git`
2. Öppna mappen i VS Code: `code TechNest`
3. Starta en lokal webbserver, till exempel **Live Server** i VS Code. Öppna inte bara HTML-filerna med `file://`, eftersom projektet använder ES-moduler och Fetch API.
4. Öppna `index.html` via webbserverns lokala adress.

Projektet kräver ingen npm-installation eller något JavaScript-ramverk.

## Dokumentation

- [ASSIGNMENT.md](ASSIGNMENT.md) – uppgiftsbeskrivningen från kursen (avsnitt 1–6)
- [PROJECT_PLAN.md](PROJECT_PLAN.md) – design, filstruktur, arkitektur, arbetsflöde och tidsplan
- [TASKS.md](TASKS.md) – detaljerad checklista och testpunkter

## Samarbete

Arbeta i separata `feature/`-branches, öppna Pull Requests och granska ändringar innan de sammanförs med `main`. Alla i gruppen ska kunna förklara centrala delar av koden vid redovisningen den **25 november 2026**.

## Om projektet

Detta är en **simulerad e-handel för utbildningsändamål**. Ingen riktig betalning genomförs och inga betalningsuppgifter samlas in. TechNest har en egen visuell identitet och kopierar inte andra butikssajters layout eller logotyper.
