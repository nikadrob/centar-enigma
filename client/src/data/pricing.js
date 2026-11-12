// Tablica: pricing (id, name, price_eur, period, features, highlighted, sort_order)
// U bazi je `features` JSON tekst, a `highlighted` 0/1
export const pricing = [
  {
    id: 1,
    name: 'Pojedinačni trening',
    price_eur: 10,
    period: 'termin',
    features: ['Lorem ipsum dolor', 'Sit amet consectetur'],
    highlighted: false,
    sort_order: 1,
  },
  {
    id: 2,
    name: '8 treninga',
    price_eur: 55,
    period: 'mjesec',
    features: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit'],
    highlighted: false,
    sort_order: 2,
  },
  {
    id: 3,
    name: 'Neograničeno',
    price_eur: 70,
    period: 'mjesec',
    features: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit', 'Sed do eiusmod'],
    highlighted: true,
    sort_order: 3,
  },
  {
    id: 4,
    name: 'Personalni trening',
    price_eur: 30,
    period: 'termin',
    features: ['Lorem ipsum dolor', 'Tempor incididunt', 'Ut labore et dolore'],
    highlighted: false,
    sort_order: 4,
  },
];
