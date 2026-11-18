# TechNest – Tasks & Progress Checklist

**Status:** Ej verifierat – markera endast uppgifter som faktiskt är genomförda och testade.

> **Arbetssätt:** Markera `- [x]` efter att funktionaliteten fungerar, har testats och vid behov har sammanförts med `main`. Filer som bara är skapade räknas inte som färdig funktionalitet.

## 1. Setup och dokumentation

- [ ] Kontrollera GitHub-repository och SSH-anslutning.
- [ ] Skapa/verifiera projektstruktur enligt [PROJECT_PLAN.md](PROJECT_PLAN.md).
- [ ] Lägg in TechNest-logotyp och korrekt namngivna bildfiler.
- [ ] Konfigurera `.gitignore` och dokumentation.
- [ ] Bestäm ansvariga, branches och arbetsflöde för Pull Requests.

## 2. Design, HTML och navigation

- [ ] Skapa semantisk startsida.
- [ ] Skapa produktkatalogsida.
- [ ] Skapa produktdetaljsida.
- [ ] Skapa favoritsida.
- [ ] Skapa varukorgs- och kassasida.
- [ ] Skapa administrationssida för CRUD.
- [ ] Skapa enhetlig header, footer och navigation.
- [ ] Implementera fungerande hamburgermeny på mobil.
- [ ] Använd egen visuell identitet och konsekventa designvariabler.

## 3. Fetch API och produktdata

- [ ] Hämta produkter från DummyJSON med `async/await`.
- [ ] Visa relevant elektronik (smartphones, laptops, tablets, mobile-accessories).
- [ ] Hantera paginering/antal så önskade produkter inte saknas.
- [ ] Rendera titel, bild, pris och relevant produktinformation.
- [ ] Öppna rätt produkt via produkt-ID.
- [ ] Visa loading state för **alla** Fetch-anrop.
- [ ] Visa begripliga felmeddelanden vid API-fel.
- [ ] Kontrollera `response.ok` och hantera fel med `try/catch`.

## 4. Sökning, filtrering och sortering

- [ ] Sök produkter efter titel.
- [ ] Filtrera efter kategori.
- [ ] Sortera pris stigande.
- [ ] Sortera pris fallande.
- [ ] Kontrollera att sökning + filter + sortering fungerar samtidigt.
- [ ] Visa tydligt meddelande när inga produkter matchar.

## 5. Favoriter och LocalStorage

- [ ] Lägg till/ta bort favorit från katalog.
- [ ] Lägg till/ta bort favorit från produktdetaljer.
- [ ] Visa sparade favoriter på separat sida.
- [ ] Bevara favoriter efter uppdatering av sidan.
- [ ] Visa tomt-läge när det inte finns några favoriter.

## 6. Varukorg och simulerad checkout

- [ ] Lägg till produkt i varukorgen.
- [ ] Öka och minska antal för samma produkt.
- [ ] Ta bort en produkt ur varukorgen.
- [ ] Räkna om delsumma och total automatiskt.
- [ ] Bevara varukorgen med LocalStorage.
- [ ] Visa varukorgen i kassan.
- [ ] Implementera knappen Köp (utan riktig betalning).
- [ ] Visa bekräftelse efter köp.
- [ ] Töm varukorgen och nollställ totalen efter köp.

## 7. CRUD och admin

- [ ] **Create:** skapa produkt via `POST /products/add`.
- [ ] **Read:** hämta/visa produkt via API.
- [ ] **Update:** uppdatera produkt via `PUT /products/:id`.
- [ ] **Delete:** ta bort produkt via `DELETE /products/:id`.
- [ ] Skapa användargränssnitt med formulär och knappar för alla operationer.
- [ ] Visa ”Sparar…”, ”Tar bort…” och annan relevant laddningsstatus.
- [ ] Visa korrekta svar eller fel från API:t.
- [ ] Förklara i gränssnittet/demonstrationen att skrivoperationer simuleras och inte sparas permanent på servern.

## 8. Tillgänglighet och responsivitet

- [ ] Testa mobil, surfplatta och desktop.
- [ ] Testa navigation med tangentbord och synliga fokustillstånd.
- [ ] Kontrollera korrekt etiketterade formulärfält och knappar.
- [ ] Kontrollera textkontrast och begripliga fel-/statusmeddelanden.
- [ ] Kontrollera relevanta WCAG 2.2 AA-kriterier.
- [ ] Säkerställ att inga viktiga funktioner försvinner på små skärmar.
- [ ] Hantera reducerad rörelse om animationer används.

## 9. Timer och slutkontroll

- [ ] Implementera `setTimeout()` eller `setInterval()` med tydligt syfte.
- [ ] Kunna förklara timerfunktionen vid redovisningen.
- [ ] Kontrollera att inga JavaScript-fel finns i webbläsarkonsolen.
- [ ] Testa tomma lägen och felaktiga användarinmatningar.
- [ ] Gör en gemensam genomgång av projektets kod.

## 10. Inlämning och presentation

- [ ] Kontrollera att GitHub-repository innehåller all projektkod.
- [ ] Dokumentera hur projektet startas lokalt.
- [ ] Spela in demo med navigation, mobilmeny, produktkatalog, API, CRUD, sök/filter/sort, favoriter, varukorg, checkout, loading, lagring, timer och responsivitet.
- [ ] Ladda upp videon **direkt på Itslearning** (inte GitHub).
- [ ] Lämna in GitHub-länk och video via Itslearning senast **24 november 2026 kl. 23:59**.
- [ ] Förbered muntlig presentation den **25 november 2026**.
- [ ] Säkerställ att alla gruppmedlemmar kan förklara kod och funktioner.

## Dokumentation

- [README.md](README.md)
- [PROJECT_PLAN.md](PROJECT_PLAN.md)
- [ASSIGNMENT.md](ASSIGNMENT.md)
