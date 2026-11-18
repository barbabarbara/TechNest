# TechNest – Project Plan

**Projekt:** E-commerce Web Application  
**Typ:** Grupparbete · HTML, CSS och Vanilla JavaScript  
**Status:** Planering / under utveckling

## 1. Projektidé och mål

TechNest är en modern, mobilanpassad elektronikbutik. Användaren ska kunna utforska produkter, söka, filtrera, sortera, spara favoriter, hantera en varukorg och genomföra ett simulerat köp. Gruppen ska också demonstrera CRUD-anrop till DummyJSON och förklara lösningen.

**Omfattning:** Smartphones, laptops, tablets och mobile accessories. Andra kategorier visas normalt inte i kundkatalogen. Kontrollera tillgängliga kategorier mot API:t vid implementation.

**Ej i omfattningen:** riktiga betalningar, kontoinloggning eller en egen databas.

## 2. Designriktning

- **Varumärke:** TechNest (utan ”Store” i logotypen).
- **Uttryck:** stilrent, luftigt och modernt med egen identitet; inspiration från allmänna premium-designprinciper, inte kopiering av någon annan sajt.
- **Färger (föreslagna):** White `#FFFFFF`, Cloud `#F5F5F7`, Graphite `#1D1D1F`, Blue `#4770DC`, Gray `#86868B`.
- **Logotyp:** egen N-symbol i gröna toner samt TechNest-ordmärke; logoassets kan bytas utan att påverka layouten.
- **Gränssnitt:** tydlig header, tillgänglig mobilmeny, produktkort, kategorifilter och lättförståeliga statusmeddelanden.

## 3. Planerad filstruktur

```text
TechNest/
├── index.html                  # Startsida
├── pages/
│   ├── products.html           # Produktkatalog
│   ├── product.html            # Produktdetaljer
│   ├── favorites.html          # Favoritlista
│   ├── cart.html               # Varukorg / kassa
│   └── admin.html              # CRUD-gränssnitt
├── css/
│   ├── style.css               # Grundstil, variabler, layout
│   ├── components.css          # Delade komponenter
│   └── responsive.css          # Responsiva anpassningar
├── js/
│   ├── main.js                 # Startsidan
│   ├── api.js                  # Fetch och CRUD-funktioner
│   ├── products.js             # Sök/filter/sort/katalog
│   ├── product-details.js      # Produktdetaljer
│   ├── favorites.js            # Favoritsida
│   ├── cart.js                 # Varukorg och kassa
│   ├── admin.js                # CRUD-formulär och feedback
│   ├── storage.js              # LocalStorage-hjälpfunktioner
│   └── ui.js                   # Delade UI-funktioner
├── assets/
│   ├── images/
│   │   ├── technest-logo.png      # Symbol + text
│   │   ├── technest-icon.png      # Endast symbol
│   │   └── technest-wordmark.png  # Endast text
│   └── icons/
├── README.md
├── ASSIGNMENT.md
├── PROJECT_PLAN.md
├── TASKS.md
└── .gitignore
```

> **Observera:** Filstrukturen är planerad. Filnamnen för logotypbilderna behöver motsvara de faktiska filerna i projektet. Projektplanen förutsätter inte att alla filer redan är implementerade.

## 4. Arkitektur och ansvar

| Del                           | Huvudansvar                                                        |
| ----------------------------- | ------------------------------------------------------------------ |
| HTML-sidor                    | Semantisk struktur och navigation                                  |
| CSS-filer                     | Färger, layout, produktkort, responsivitet                         |
| `api.js`                      | Enhetliga Fetch-anrop med felhantering                             |
| `products.js`                 | Hämta och visa elektronik; kombinera sökning, filter och sortering |
| `product-details.js`          | Hämta vald produkt via ID i URL                                    |
| `favorites.js` + `storage.js` | Favoriter i LocalStorage                                           |
| `cart.js` + `storage.js`      | Varukorg, antal, totalbelopp, köpbekräftelse                       |
| `admin.js`                    | Formulär och API-baserad CRUD                                      |
| `ui.js`                       | Loading, felmeddelanden och återanvändbara UI-hjälpare             |

### API-strategi

Basadress: `https://dummyjson.com/products`

- **Read:** `GET /products`, `GET /products/:id` eller kategorianrop.
- **Create:** `POST /products/add`.
- **Update:** `PUT /products/:id` (eller API-stödd PATCH).
- **Delete:** `DELETE /products/:id`.
- **Feedback:** visa laddning medan anrop pågår; återställ knappar/status och visa fel om anropet misslyckas.

**Viktigt:** DummyJSON simulerar skrivoperationerna. API-svaren ska visas korrekt. Om gruppen vill att förändringarna även ska synas efter ett anrop kan en separat lokal UI-state användas. Den ska inte förväxlas med permanent lagring på servern.

### Dataflöde

```text
DummyJSON API --Fetch--> api.js --> sidans JavaScript --> DOM/HTML
                                     |
                                     +--> storage.js --> LocalStorage
                                            (favoriter/varukorg)
```

### Kategorier

Föreslagen kundkatalog: `smartphones`, `laptops`, `tablets`, `mobile-accessories`. Alla relevanta produkter måste hämtas från API:t; undvik hårdkodade produktposter. Ta hänsyn till API:ts paginering och/eller `limit` så att inte bara de första resultaten visas av misstag.

## 5. Funktionskrav och acceptanskriterier

### Katalog

- Sökning på produktnamn fungerar tillsammans med valt kategorifilter och prissortering.
- Sorteringsalternativ: pris stigande och pris fallande.
- Tomt sökresultat ger ett tydligt meddelande.

### Favoriter

- Lägg till och ta bort produkter.
- Favoriter finns kvar efter omladdning via LocalStorage.
- Tom lista förklaras tydligt.

### Varukorg

- Samma produkt kan få antal > 1.
- Användaren kan öka/minska antal och ta bort en produkt.
- Summan uppdateras direkt.
- Ett simulerat köp visar bekräftelse och tömmer varukorgen.

### CRUD

- Create, Read, Update och Delete kan utföras genom gränssnittet.
- API-svar, laddning och fel hanteras korrekt.
- Det framgår att CRUD-ändringar inte sparas permanent hos DummyJSON.

### Tillgänglighet och responsivitet

- Semantiska element, tangentbordsstöd, tydliga fokusmarkeringar, etiketter och begripliga felmeddelanden.
- Relevant WCAG 2.2 AA: kontrollera kontrast, navigation, formulär, fokus och mobil användbarhet.
- Funktioner ska gå att använda på mobil, surfplatta och dator.
- Respektera `prefers-reduced-motion` om animationer används.

### Timer

Använd `setTimeout()` för att exempelvis dölja ett kort statusmeddelande efter några sekunder. Viktiga köpbekräftelser måste samtidigt vara möjliga att uppfatta och inte försvinna för snabbt.

## 6. Föreslagen grupparbetsmodell

Fördela ägarskap efter funktion, inte bara fil. Bestäm ansvariga när gruppen har kommit överens.

| Arbetsområde                  | Ansvarig     | Status   |
| ----------------------------- | ------------ | -------- |
| Design, header, navigation    | Ej tilldelad | Planerad |
| API och produktkatalog        | Ej tilldelad | Planerad |
| Produktdetaljer och favoriter | Ej tilldelad | Planerad |
| Varukorg och LocalStorage     | Ej tilldelad | Planerad |
| CRUD, testning och demo       | Ej tilldelad | Planerad |

**Git-flöde:** `main` ska innehålla stabil kod. Varje del utvecklas i en branch, exempelvis `feature/catalog`, `feature/cart` eller `feature/admin`; skapa Pull Request och gör kodgranskning. Samordna ändringar i delade CSS-/JS-filer.

## 7. Föreslagen tidsplan

| Datum                  | Mål                                                                    |
| ---------------------- | ---------------------------------------------------------------------- |
| 9–11 november          | Filstruktur, dokumentation, design, header och navigation              |
| 12–16 november         | API, produktkatalog, produktdetaljer, sökning/filter/sortering         |
| 17–20 november         | Favoriter, LocalStorage, varukorg, checkout och CRUD                   |
| 21–23 november         | Integration, responsivitet, tillgänglighet, felhantering och demovideo |
| 24 november före 23:59 | Slutkontroll och inlämning via Itslearning                             |
| 25 november            | Muntlig redovisning                                                    |

## 8. Testning och demonstration

Testa följande manuellt på desktop och mobil:

1. Navigation och mobilmeny, även med tangentbord.
2. API-laddning samt fel vid misslyckat anrop.
3. Produktlista, detaljsida och kombinerad sökning/filter/sortering.
4. CRUD inklusive visat API-svar och förklaring av simulering.
5. Favoriter och varukorg efter uppdatering av sidan.
6. Ändra antal, ta bort produkt, genomföra simulerat köp.
7. Tomma listor, inga sökträffar och tydliga statusmeddelanden.
8. Avsaknad av JavaScript-fel i konsolen.
9. Relevanta WCAG 2.2 AA-kontroller.

Alla gruppmedlemmar bör kunna förklara `fetch`, `async/await`, DOM, LocalStorage, CRUD och `setTimeout`/`setInterval`.

## 9. Risker och beslut

- **API-begränsningar:** DummyJSON sparar inte CRUD permanent; demonstrera skillnaden mellan API-svar och lokal state.
- **Integration:** delad header/CSS och gemensamma funktioner kan skapa merge-konflikter; små Pull Requests minskar risken.
- **Tid:** prioritera samtliga obligatoriska funktioner före extra animationer och designeffekter.
- **Originalitet:** TechNest ska ha självständiga grafiska element och egen layout.

## 10. Länkar

- [Uppgiftsbeskrivning](ASSIGNMENT.md)
- [Checklista](TASKS.md)
- [README](README.md)
- [DummyJSON Products API](https://dummyjson.com/docs/products)
