# Inlämningsuppgift – Bygg en E-commerce med HTML, CSS och JavaScript

**Kursprojekt:** E-commerce Web Application  
**Deadline:** 24 november 2026, kl. 23:59  
**Muntlig redovisning:** 25 november 2026  
**Arbetsform:** Grupparbete

## 1. Uppgiftsbeskrivning

I den här uppgiften ska ni utveckla en fungerande E-commerce-webbplats (e-handel) med hjälp av **HTML, CSS och JavaScript**.

Webbplatsen ska låta användaren bläddra bland produkter, söka, filtrera, sortera, hantera favoriter, lägga produkter i en varukorg och genomföra ett simulerat köp.

Ni ska hämta produktinformation från ett externt API och implementera CRUD-funktionalitet för produkterna.

Fokus ligger på JavaScript, API-hantering, DOM-manipulation, användarvänlighet, responsiv design och tillgänglighet.

## 2. Tekniker och verktyg

Följande tekniker ska användas:

- **HTML5** – för webbplatsens struktur.
- **CSS3** – för design, layout och responsivitet.
- **JavaScript (Vanilla JS)** – för funktionalitet och interaktivitet.
- **Fetch API** – för kommunikation med API.
- **LocalStorage eller SessionStorage** – för att lagra information i webbläsaren.
- **Git och GitHub** – för versionshantering och inlämning.

Ni ska använda följande API:

[https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)

## 3. Krav på webbplatsens sidor

Webbplatsen ska innehålla **minst fyra olika sidor eller vyer** med fungerande navigation mellan dem.

Exempel på sidor:

### Startsida

- Presentera webbplatsen och dess syfte.
- Visa utvalda produkter från API.
- Ha en tydlig länk till produktkatalogen.

### Produktkatalog

- Visa produkter som hämtas från API.
- Visa produktbild, namn, pris och annan relevant information.
- Implementera sökning, filtrering och sortering.
- Ge användaren möjlighet att lägga till produkter i varukorgen och favoritlistan.
- Länka vidare till respektive produkts detaljsida.

### Produktdetaljer

- Visa information om en vald produkt.
- Visa produktbild, namn, beskrivning, pris och kategori.
- Ge användaren möjlighet att lägga till produkten i varukorgen och favoritlistan.

### Favoriter

- Visa produkter som användaren har markerat som favoriter.
- Ge möjlighet att ta bort produkter från favoritlistan.
- Visa ett tydligt meddelande om favoritlistan är tom.

### Varukorg och kassa

- Visa produkter som användaren har lagt till i varukorgen.
- Visa antal, pris och totalbelopp.
- Ge möjlighet att ändra antal eller ta bort produkter.
- Ha en knapp för att genomföra ett simulerat köp.
- Visa ett tydligt bekräftelsemeddelande när köpet har genomförts.

Ni får gärna skapa fler sidor och funktioner.

## 4. Funktionella krav

### 4.1 API och CRUD

Alla produkter ska hämtas från DummyJSON Products API.

Ni ska implementera följande CRUD-operationer:

- **Create:** Lägg till en ny produkt via API.
- **Read:** Hämta och visa produkter från API.
- **Update:** Uppdatera information om en befintlig produkt via API.
- **Delete:** Ta bort en produkt via API.

Det ska finnas ett användargränssnitt där dessa operationer kan utföras, exempelvis via formulär och knappar.

**Viktigt:** DummyJSON är ett test-API. Create, Update och Delete simuleras av API och sparas inte permanent på servern. Ni ska kunna visa att API-anropen fungerar och hantera svaren korrekt i gränssnittet.

### 4.2 Sökning, filtrering och sortering

Användaren ska kunna:

- Söka efter produkter baserat på namn.
- Filtrera produkter efter kategori.
- Sortera produkter efter pris, både stigande och fallande.

Funktionerna ska fungera tillsammans. Exempelvis ska användaren kunna söka efter en produkt inom en vald kategori och sedan sortera resultaten efter pris.

Om inga produkter matchar sökningen eller filtreringen ska ett tydligt meddelande visas.

### 4.3 Favoritlista

- Användaren ska kunna lägga till produkter som favoriter.
- Favoriterna ska visas på en separat sida.
- Användaren ska kunna ta bort favoriter.
- Favoritlistan ska sparas med LocalStorage eller SessionStorage.

### 4.4 Varukorg och betalning

- Användaren ska kunna lägga till produkter i varukorgen.
- Samma produkt ska kunna läggas till flera gånger.
- Användaren ska kunna ändra antalet produkter.
- Användaren ska kunna ta bort produkter.
- Totalbeloppet ska beräknas automatiskt.
- Varukorgen ska visas i kassan.

**Simulerad betalning:**

När användaren klickar på knappen "Köp" ska ett köp simuleras.

Efter ett lyckat köp ska:

1. Ett tydligt bekräftelsemeddelande visas på sidan, exempelvis "Tack för ditt köp! Din beställning har genomförts."
2. Varukorgen tömmas.
3. Totalbeloppet återställas.

Ingen riktig betalningstjänst behöver integreras och inga riktiga betalningsuppgifter ska samlas in.

### 4.5 Loading States och felhantering

**Alla Fetch API-anrop ska ha en loading state.**

Det innebär att användaren ska få visuell återkoppling medan ett API-anrop pågår.

Exempel:

- Visa en spinner eller texten "Laddar produkter..."
- Visa "Sparar produkt..." vid Create eller Update.
- Visa "Tar bort produkt..." vid Delete.
- Dölj loading-indikatorn när anropet är klart.
- Visa ett begripligt felmeddelande om API-anropet misslyckas.

Användaren ska inte behöva undra om webbplatsen arbetar eller har slutat fungera.

### 4.6 LocalStorage eller SessionStorage

Ni måste använda minst en av följande:

- `localStorage`
- `sessionStorage`

Det kan exempelvis användas för favoritlistan, varukorgen eller andra användarinställningar.

Ni ska kunna förklara vilken information ni lagrar och varför.

### 4.7 setTimeout eller setInterval

Ni ska använda minst en av följande JavaScript-funktioner:

- `setTimeout()`
- `setInterval()`

Funktionen ska ha ett tydligt syfte.

Exempel:

- Visa ett bekräftelsemeddelande som försvinner efter några sekunder.
- Skapa en automatisk bildkarusell.
- Implementera en timer.

Ni ska kunna förklara hur och varför funktionen används.

## 5. Design, navigation och responsivitet

Webbplatsen ska ha en genomtänkt, enhetlig och användarvänlig design.

### Header och navigation

- En tydlig header med webbplatsens namn eller logotyp.
- Navigation mellan samtliga sidor.
- En fungerande mobilmeny (hamburgermeny).
- Tydlig markering eller återkoppling för navigation och interaktiva element.

### Responsiv design

Webbplatsen ska fungera på:

- Mobiltelefon
- Surfplatta
- Dator

Layouten ska anpassas efter skärmstorleken och inga viktiga funktioner får försvinna på mindre skärmar.

### Tillgänglighet och WCAG

Webbplatsen ska följa relevanta tillgänglighetsprinciper enligt WCAG 2.2 nivå AA.

## 6. Kodkvalitet och struktur

Er kod ska vara tydlig, organiserad och lätt att förstå.

Följande förväntas:

- Semantisk HTML.
- Strukturerad CSS.
- JavaScript uppdelad i återanvändbara funktioner.
- Tydliga variabel- och funktionsnamn.
- Undvik onödig duplicering av kod.
- Använd `async/await` eller Promises vid API-anrop.
- Hantera fel med exempelvis `try/catch`.
- Undvik JavaScript-fel i webbläsarens konsol.
