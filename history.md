# Povijest projekta: Centar Enigma

Sažetak dosadašnjeg rada za nastavak na drugom računalu.
Pravila projekta, naredbe, API i struktura mapa nalaze se u `CLAUDE.md`; ovdje su
tijek rada, odluke i otvorene stavke. Stanje: 14. 11. 2026.

## Prijenos na drugo računalo

1. Zadnji commit je `c6a9c8a 'Nastavak'`. **Izmjene iz sesije 14. 11. (vidi dolje) još
   nisu commitane**: prije prijenosa napravi commit i push (ili kopiraj cijelu mapu).
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

### Sesija 14. 11. 2026 (stil i sitnice, sve u CSS-u osim navedenog)

| Promjena | Detalji |
|---|---|
| Društvene mreže | Nova komponenta `components/SocialLinks.jsx` (Instagram, Facebook; `target="_blank"`, `rel="noopener noreferrer"`). Ikone `instagram.jpg` / `facebook.png` u `resources.js`. Stoje u desnom kutu prostora ispod headera (na vrhu `Pocetna.jsx`, `position: absolute`), vertikalno centrirane, 3 px uvučene, razmak 16 px. U boji, hover crno-bijelo |
| Prostor ispod headera | `.section--hero`: `--hero-pad` = 70 % od 64 / 96 px (≈ 45 / 67 px); ista varijabla određuje `padding-top` i položaj ikona |
| Naslovi sekcija | Font Inter (umjesto Inter Tight), veličina 85 % prijašnje, `letter-spacing` −0.0175em (Početna −0.0225em) |
| Naslov Početne | „Centar” / „Enigma” u dva reda (`Pocetna.jsx` dijeli `home.title` na prvom razmaku); „Enigma” u `--color-accent` |
| Paleta | `client/public/Resursi/colors.png` (žuta, zelena, plava, višnja, sive); u `base.css` samo korištene nijanse (`--yellow-*`, `--cherry-*`, `--slate-*`) |
| Kartice | Slika bez paddinga, do ruba kartice; gornji kutovi zaobljeni, donji ravni (`.card > .image`) |
| Treneri | Uklonjena zajednička fotografija tima (`teamImage` iz `trainers.js`, `.team-photo` CSS) |
| Gradijent | O nama više ne tamni do crne (`--grey-5` → `--grey-6`); Kontakt počinje istom sivom i u prvih 64 px prelazi u tamno sivu `#383B3D` |

### Sesija 14. 11. 2026, nastavak (naknadno, nije commitano)

| Promjena | Detalji |
|---|---|
| Akcent | `--color-accent` = `#D19902` (zlatnožuta): „Enigma” u naslovu, preporučeni paket i njegov fokus. `--yellow-2` (`#D1BD02`) ostao definiran, ali se više ne koristi |
| Gumbi | `.button` radijus `999px` → `var(--radius-sm)` (12 px, pola prijašnjeg efektivnog 24 px). Navigacija, hamburger i oznaka paketa ostali kapsule |
| Karta | Nova komponenta `components/MapEmbed.jsx` na dnu O nama (ispod trenera, naslov „Gdje se nalazimo”). Google iframe se učitava tek na klik „Prikaži kartu” (GDPR, kolačići); prije toga kartica `--card-color` s napomenom. Izbor se ne pamti. URL u `contact.map_url` (`client/src/data/contact.js`), koordinate 45.323630972844306, 14.444177850435754, z=16, bez API ključa. Shema baze nije mijenjana; za bazu ponovno pokrenuti seed |
| Povratak na vrh | Okrugli gumb (višnja, bijela SVG strelica, 44 px, `.to-top`, poveznica na `#pocetna`) u donjem desnom kutu obrasca u Kontaktu, u retku s „Pošalji” (`.contact__actions`). Podnožje je opet samo „© … Centar Enigma” |

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

## Stil (trenutno stanje, 14. 11. 2026)

Sve boje su CSS varijable u `client/src/styles/base.css`; izvor palete je `colors.png`.

| Element | Boja | Varijabla |
|---|---|---|
| „Enigma” u naslovu, preporučeni paket (okvir + oznaka, tamni tekst) | zlatnožuta `#D19902` | `--color-accent` |
| Gumbi (bijeli tekst), gumb „na vrh” | višnja `#A80265`, hover `#8C0152` | `--color-button`, `--color-button-hover` |
| Naslovi kartica | višnja `#8C0152` | `--color-secondary` |
| Poveznice, fokus, crta aktivne sekcije, točkice u Cjeniku | tamna zlatna `#8A5F0F` | `--color-accent-strong` |
| Zlatna na tamnom (Kontakt) | `#D9A441` | `--color-accent-light` |
| Tekst / prigušeni tekst | `#191B1C` / `#44494C` | `--color-text`, `--color-muted` |
| Sekcije | hladni sivi gradijent `#F6F7F8` → `#9BA3A8` | `--grey-1` … `--grey-6` |
| Kontakt / kartice u Kontaktu | tamno siva `#383B3D` / `#2F3234` | `--color-dark`, `--color-dark-surface` |
| Podnožje | `#9BA3A8` | `--color-footer` |

- **Kartice (PROBA, odobrena kao smjer):** blok označen `PROBA` u `components.css` daje
  karticama izvan Kontakta prozirno tamnjenje `rgba(0,0,0,.04)` (nijansu tamnije od
  podloge), rub `rgba(0,0,0,.1)` i naslove u višnji. Brisanjem bloka kartice se vraćaju
  na `--card-color` (`#FDF6B9`). Ako ostaje, blok preseliti u `.card` / `.card__title`
  i ažurirati pravilo o karticama u `CLAUDE.md` (tamo još piše `#FDF6B9`).
- Kontakt po uzoru na `Inspiracija/about.png`: tamno siv, krupan e-mail, polja s donjom
  linijom, golemi izblijedjeli natpis „ENIGMA” (CSS `::after`).
- Fontovi Inter (tekst i naslovi sekcija) i Inter Tight (ostali naslovi), lokalno u
  `client/public/fonts/` (varijabilni woff2, OFL licence uz njih). Namjerno bez Google Fonts (GDPR).
- Kontrast: akcent na svijetlosivom ima nizak kontrast (namjerno, krupan naslov);
  sve ostale kombinacije teksta ≥ 4.5:1.

### Tijek odluka o boji (da se ne ponavlja)

Pastelne kartice → topli tonovi iz `raspored.png` → prva paleta (zlatna `#DEB021` + plava
`#214FDE`) → nova paleta (`colors.png`) s karticama žuta / plava / ružičasta → sve kartice
`#FCF299` → `#FDF6B9` → PROBA sive kartice. „Enigma”: `#D1BD02` → `#FDF6B9` (nevidljivo) →
`#D6C100` → `#D1BD02` → `#D19902`; naslovi kartica: `#837601` → `#D6C100` → `#F4E00B` → boja gumba → višnja.
Plava je potpuno izbačena i zamijenjena višnjom. Gumbi: žuta → višnja.

## Kako je testirano

- Build (`npm run build`) nakon svakog koraka.
- Headless Chrome preko DevTools protokola (skripte su bile privremene, nisu u repozitoriju):
  širine 360 / 768 / 1280 px, horizontalni preljev, učitane slike, konzola, navigacija,
  hamburger, aktivna sekcija, animacije s i bez `prefers-reduced-motion`.
- API: Postman kolekcija na zasebnoj testnoj bazi (`DB_PATH`), sve provjere prolaze.
- Napomena: obični `--headless --screenshot` ne poštuje širine ispod ~500 px i ne šalje
  scroll događaje; za takve provjere koristiti CDP ili DevTools u pregledniku.

## Otvoreno / sljedeći koraci

- [x] Prvi commit cijelog projekta
- [ ] Commit izmjena iz sesije 14. 11. 2026 (uključujući novi `colors.png`)
- [ ] PROBA blok kartica: potvrditi i preseliti u stalna pravila ili obrisati
- [ ] Vizualna provjera u pregledniku (360 / 768 / 1280 px) nakon izmjena 14. 11.:
      ikone ispod headera na 360 px, čitljivost naslova u Cjeniku, prijelaz O nama → Kontakt
- [ ] Commit izmjena iz nastavka sesije 14. 11. (akcent, radijus gumba, karta, „na vrh”)
- [ ] Vizualna provjera: karta prije/poslije klika na 360 px, red „Pošalji” + „na vrh”,
      novi radijus gumba
- [ ] Prava adresa u `contact.address` (još „Lorem ipsum ulica 1, Zagreb”), a karta je u Rijeci
- [ ] Ako se doda banner za kolačiće, `MapEmbed` neka čita privolu iz njega
- [ ] Neiskorištene varijable u `base.css`: `--yellow-1`, `--yellow-2`, `--yellow-3`, `--grey-7`
      (a `--card-color` je zasjenjen dok je PROBA aktivna); počistiti kad se stil potvrdi
- [ ] Frontend prebaciti s `client/src/data/` na API (fetch preko Vite proxyja `/api`)
- [ ] Obrazac u Kontaktu spojiti na `POST /api/contact` (prikaz grešaka iz `fields`)
- [ ] Pravi tekstovi umjesto lorem ipsuma; pravi kontakt podaci (`map_url` je postavljen)
- [x] Logo zamijenjen izrezanom verzijom (640 × 190 px); u navigaciji 56 px visok i centriran
- [ ] Favicon u `client/index.html` još koristi široki `logo-enigma.png`; kvadratni
      `logo-enigma.jpg` (72 × 72) bio bi bolji
- [ ] Neiskorištene slike u `resources.js`: `pocetna4`, `pocetnaKvadrat`, `treneriTim`
      (od 14. 11.), `treneriTim02/03`, `trenerMonika02`, `trenerVanja02`
- [x] Dvobojni naslov („Enigma” u akcentnoj boji, u drugom redu)
- [ ] `created_at` u `contact_messages` je UTC bez oznake zone: paziti pri prikazu
- [ ] `npm run test:api` protiv dev servera upisuje testnu poruku u pravu bazu
- [ ] `postman init` je stvorio `AGENTS.md`, `.postman/` i `postman/skills/`: odlučiti
      ostaju li u repozitoriju
