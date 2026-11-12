// Jedino mjesto s putanjama do slika i logotipa.
// Podaci (news, trainings...) u polju `image` spremaju KLJUČ iz ovog objekta.
// Za zamjenu slike promijeni samo putanju ovdje; vrijednost null prikazuje ImagePlaceholder.

const BASE = '/Resursi/';

export const resources = {
  logo: `${BASE}logo-enigma.png`,

  // Početna
  hero: `${BASE}pocetna5.png`,
  pocetna1: `${BASE}pocetna1.png`,
  pocetna2: `${BASE}pocetna2.png`,
  pocetna3: `${BASE}pocetna3.png`,
  pocetna4: `${BASE}pocetna4.png`,
  pocetnaKvadrat: `${BASE}pocetna.png`,

  // Novosti
  novosti01: `${BASE}novosti_01.png`,
  novosti02: `${BASE}novosti_02.png`,
  novosti03: `${BASE}novosti_03.png`,
  novosti04: `${BASE}novosti_04.png`,
  novosti05: `${BASE}novosti_05.png`,
  novosti06: `${BASE}novosti_06.png`,

  // Treninzi
  treninzi01: `${BASE}treninzi01.png`,
  treninzi02: `${BASE}treninzi02.png`,
  treninzi03: `${BASE}treninzi03.png`,
  treninzi04: `${BASE}treninzi04.png`,
  treninzi05: `${BASE}treninzi05.png`,
  treninzi06: `${BASE}treninzi06.png`,
  treninzi07: `${BASE}treninzi07.png`,
  raspored: `${BASE}raspored.png`,

  // O nama
  about1: `${BASE}about1.png`,
  about2: `${BASE}about2.png`,
  about3: `${BASE}about3.png`,
  about4: `${BASE}about4.png`,

  // Treneri
  treneriTim: `${BASE}treneri.png`,
  treneriTim02: `${BASE}treneri02.png`,
  treneriTim03: `${BASE}treneri03.png`,
  trenerBojan: `${BASE}treneri_bojan.png`,
  trenerMonika: `${BASE}treneri_monika.png`,
  trenerMonika02: `${BASE}treneri_monika02.png`,
  trenerVanja: `${BASE}treneri_vanja.png`,
  trenerVanja02: `${BASE}treneri_vanja02.png`,
};

// Vraća putanju za ključ ili null (nepoznat ključ ili slika još ne postoji)
export function getImage(key) {
  return (key && resources[key]) || null;
}
