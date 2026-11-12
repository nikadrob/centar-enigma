# Povijest projekta: Centar Enigma

Sažetak dosadašnjeg rada za nastavak na drugom računalu.
Pravila projekta, naredbe, API i struktura mapa nalaze se u `CLAUDE.md`; ovdje su
tijek rada, odluke i otvorene stavke. Stanje: 12. 11. 2026.

## Prijenos na drugo računalo

1. **Repozitorij još nema nijednog commita.** Prije prijenosa napravi commit i push
   (ili kopiraj cijelu mapu).
2. U git NE ulaze (vidi `.gitignore`), pa ih treba prenijeti ili ponovno stvoriti:
   - `Inspiracija/`: slike za vizualnu referencu; kopiraj ručno ako trebaju
   - `server/data/enigma.db`: ponovno se stvara seedom
   - `node_modules/`, `client/dist/`
3. Na novom računalu (korišten Node 24, npm 11):
   ```
   npm install
   npm install --prefix client
   npm install --prefix server
   npm run seed --prefix server
   npm run dev
   ```
   Klijent: http://localhost:5173, server: http://localhost:3001/api/health
4. Za `npm run test:api` treba Postman CLI (`npm install -g postman-cli`).
   Prijava u Postman nije potrebna; kolekcija je samo lokalna.
5. `better-sqlite3` je nativni modul. Ako `npm install` javi grešku pri buildu,
   provjeri da je verzija Nodea ista ili novija.

## Što je napravljeno (redom)

| Korak | Sadržaj |
|---|---|
| 1 | Monorepo (`client/` React 19 + Vite 8, root skripte), `CLAUDE.md`, `Resursi/` premješten u `client/public/Resursi/`, logo preimenovan u `logo-enigma.png` |
| 2 | Express 5 kostur, `GET /api/health`, `npm run dev` (concurrently) |
| 3 | Podaci u `client/src/data/` (lorem ipsum) + `resources.js` s putanjama svih slika |
| 4 | Komponente `Section`, `Card`, `ImagePlaceholder`, `Logo` i 6 sekcija; obrazac u Kontaktu (samo lokalna potvrda) |
| 5 | Fiksna navigacija, glatko klizanje, `scroll-margin-top`, hash u URL-u |
| 6 | Hamburger izbornik ispod 768 px (Esc, klik izvan, zatvaranje na poveznicu) |
| 7 | `useActiveSection`: aktivna poveznica + `history.replaceState`; dolazak na `/#sekcija` |
| 8 | `useReveal`: bounce animacija naslova i kartica pri ulasku u ekran; poštuje `prefers-reduced-motion` |
| 9 | SQLite shema (7 tablica), `db.js`, `seed.js` (uvozi izravno iz `client/src/data/`) |
| 10 | GET rute za sav sadržaj + `POST /api/contact` s validacijom (poruke na hrvatskom) |
| — | Postman kolekcija `postman/collections/Centar Enigma API/` (12 zahtjeva, 33 provjere) i okruženje `Lokalno` |
| 11 | Završna provjera na 360 / 768 / 1280 px, favicon |
| Stil | Dizajn prema `Inspiraciji/` (samo CSS u `client/src/styles/` + fontovi) |

## Važne odluke i odstupanja od prvotnog plana

- **Slike** su odmah spojene iz `Resursi/` (ne placeholderi); `ImagePlaceholder` ostaje kao rezerva.
- **Nazivi treninga** (Enigma Coffee, Core, Burn, Flow, Circuit) preuzeti su s `raspored.png`,
  imena trenera (Bojan, Monika, Vanja) iz naziva datoteka. Sve ostalo je lorem ipsum.
- **Kontakt podaci** (adresa, telefon, e-mail) su izmišljeni: treba ih zamijeniti pravima.
- **Dodana tablica `trainers`** i `contact_messages` (obrazac).
- **Aktivna sekcija** koristi slušač skrolanja s `requestAnimationFrame`, ne `IntersectionObserver`
  (pouzdanije za prekratku zadnju sekciju).
- **Animacija** se pokreće po kartici kad ona uđe u ekran (ne po cijeloj sekciji),
  jer su sekcije na mobitelu visoke nekoliko ekrana.
- **Seed** ne kopira sadržaj nego ga uvozi iz `client/src/data/`, da frontend i baza ostanu isti.
- **GET odgovori API-ja** imaju isti oblik kao datoteke u `client/src/data/`
  (JSON polja parsirana, `highlighted` boolean), pa će prelazak frontenda na API biti jednostavan.
- **Auto-reload servera**: `node --watch` umjesto nodemona.

## Stil (odobreno)

- Akcent: zlatna iz logotipa, `#9A6B1F` (na svijetlom), `#D4A44C` (na tamnom).
- Header bijeli; sekcije sivi gradijent `#F7F7F5` → `#D3D3CE`, u sekciji O nama postupno
  tamni do Kontakta (`#1A1A1A` → `#0D0D0D`); podnožje `#999999`.
- Pastelne kartice po sekciji: Početna breskva `#FBE3D4`, Novosti plava `#DCE8F6`,
  Treninzi menta `#D9EFE2`, Cjenik lavanda `#E7E0F5`, O nama vanilija `#F6ECCB`.
- Kontakt po uzoru na `Inspiracija/about.png`: tamno, krupan e-mail, polja s donjom linijom,
  golemi izblijedjeli natpis „ENIGMA” (CSS `::after`).
- Fontovi Inter (tekst) i Inter Tight (naslovi), lokalno u `client/public/fonts/`
  (varijabilni woff2, OFL licence uz njih). Namjerno bez Google Fonts (GDPR).
- Sve boje su CSS varijable u `client/src/styles/base.css`.

## Kako je testirano

- Build (`npm run build`) nakon svakog koraka.
- Headless Chrome preko DevTools protokola (skripte su bile privremene, nisu u repozitoriju):
  širine 360 / 768 / 1280 px, horizontalni preljev, učitane slike, konzola, navigacija,
  hamburger, aktivna sekcija, animacije s i bez `prefers-reduced-motion`.
- API: Postman kolekcija na zasebnoj testnoj bazi (`DB_PATH`), sve provjere prolaze.
- Napomena: obični `--headless --screenshot` ne poštuje širine ispod ~500 px i ne šalje
  scroll događaje; za takve provjere koristiti CDP ili DevTools u pregledniku.

## Otvoreno / sljedeći koraci

- [ ] Prvi commit (i push) cijelog projekta
- [ ] Frontend prebaciti s `client/src/data/` na API (fetch preko Vite proxyja `/api`)
- [ ] Obrazac u Kontaktu spojiti na `POST /api/contact` (prikaz grešaka iz `fields`)
- [ ] Pravi tekstovi umjesto lorem ipsuma; pravi kontakt podaci; `map_url`
- [ ] Logo: izrez u `navbar.css` vrijedi samo za sadašnji `logo-enigma.png`
      (prilagoditi pri zamjeni); favicon u `client/index.html` koristi istu putanju
- [ ] Neiskorištene slike u `resources.js`: `pocetna4`, `pocetnaKvadrat`, `treneriTim02/03`,
      `trenerMonika02`, `trenerVanja02`
- [ ] Dvobojni naslov iz inspiracije (riječ u akcentnoj boji) traži promjenu JSX-a
- [ ] `created_at` u `contact_messages` je UTC bez oznake zone: paziti pri prikazu
- [ ] `npm run test:api` protiv dev servera upisuje testnu poruku u pravu bazu
- [ ] `postman init` je stvorio `AGENTS.md`, `.postman/` i `postman/skills/`: odlučiti
      ostaju li u repozitoriju
