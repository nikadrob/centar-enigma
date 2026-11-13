# Centar Enigma: web stranica fitness studija

## Stack
- Frontend: React + Vite (mapa `client/`), obični CSS
- Backend: Node.js + Express + SQLite via better-sqlite3 (mapa `server/`)
- Monorepo: root `package.json` samo pokreće skripte; svaka mapa ima svoje ovisnosti

## Naredbe
- `npm install` (u rootu) pa `npm install --prefix client` i `npm install --prefix server`
- `npm run dev`: pokreće klijent (5173) i server (3001) zajedno
- `npm run dev:client` / `npm run dev:server`: pojedinačno
- `npm run build`: produkcijski build klijenta
- `npm run seed --prefix server`: ubacuje početni sadržaj u bazu (uvozi iz `client/src/data/`)
- `npm run test:api`: Postman kolekcija protiv pokrenutog servera (Postman CLI);
  ispravan POST upisuje testnu poruku u bazu

## API (server, port 3001; Vite proxy `/api` s 5173)
- GET `/api/health`, `/api/news`, `/api/trainings`, `/api/pricing`, `/api/about`,
  `/api/trainers`, `/api/contact`: isti oblik kao `client/src/data/*.js`
  (JSON polja su parsirana, `highlighted` je boolean)
- POST `/api/contact` { name, email, phone?, message } → 201 { id, created_at }
  ili 400 { error, fields: { polje: poruka } }
- Sve greške i nepoznate `/api` rute vraćaju JSON
- Pri promjeni API-ja ažuriraj i kolekciju u `postman/collections/Centar Enigma API/`
  i provjeri je s `postman collection lint` i `npm run test:api`

## Struktura
- `client/src/data/`: hard-codean sadržaj (lorem ipsum), jedna datoteka po tablici
- `client/src/data/resources.js`: JEDINO mjesto s putanjama slika i logotipa
- `client/src/components/`: zajedničke komponente (Navbar, Section, Card, ImagePlaceholder, Logo)
- `client/src/sections/`: po jedna komponenta za svaku sekciju
- `client/src/hooks/`: useActiveSection, useReveal
- `server/src/`: Express app, `schema.sql`, `seed.js`, `routes/`
- `postman/`: Postman kolekcija (v3 YAML) i okruženje `Lokalno`; `.postman/` i
  `AGENTS.md` stvorio je `postman init` (bez povezanog workspacea)
- `Inspiracija/`: samo vizualna referenca, nije dio aplikacije (u .gitignore)

## Pravila
- SPA, sekcije (id): pocetna, novosti, treninzi, cjenik, o-nama, kontakt
- Sadržaj dolazi iz `client/src/data/`; strukture odgovaraju tablicama u bazi
  (news, trainings, pricing, about, trainers, contact, contact_messages)
- Polje `image` u podacima sprema ključ iz `resources.js`, ne putanju
- Bez slike koristi se `ImagePlaceholder`; bez logotipa tekstualni `Logo`
- Slike i logo idu u `client/public/Resursi/`; nazivi datoteka bez razmaka
- Stil (inspiracija: `Inspiracija/`, bez preuzimanja njihovih tekstova i slika):
  - boje su CSS varijable u `client/src/styles/base.css` (akcent je zlatna iz logotipa)
  - header bijeli; sekcije sivi gradijent koji prema kraju tamni; Kontakt tamni; podnožje `#999999`
  - kartice svake sekcije imaju svoju pastelnu boju (`--card-bg` po `#id` sekcije)
  - fontovi Inter (tekst) i Inter Tight (naslovi), lokalno u `client/public/fonts/` (OFL), bez Google Fonts
- Logo u navigaciji: visina `--nav-h` − 16 px, vertikalno centriran; datoteka logotipa
  treba biti izrezana bez praznog ruba
- Mobile-first, bez horizontalnog skrolanja na 360 px
- Fiksna navigacija: sekcije imaju `scroll-margin-top`, hash u URL-u se
  ažurira s `history.replaceState`
- Animacije moraju poštovati `prefers-reduced-motion`
- Kontakt sadrži obrazac; kasnije šalje na `POST /api/contact`
- Frontend zasad NE koristi API
- Favicon u `client/index.html` koristi putanju logotipa (ne može čitati resources.js)
- Tekstovi na stranici su na hrvatskom jeziku
- Rad u malim koracima; nakon svakog koraka stati da korisnik provjeri
- Nakon većih promjena pokreni aplikaciju i provjeri da se build ne ruši
