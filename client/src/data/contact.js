// Tablica: contact (id = 1, address, phone, email, working_hours, map_url)
// U bazi je `working_hours` JSON tekst
export const contact = {
  id: 1,
  address: 'Lorem ipsum ulica 1, 10000 Zagreb',
  phone: '+385 1 234 5678',
  email: 'info@example.com',
  working_hours: [
    { days: 'Ponedjeljak – petak', hours: '07:00 – 21:00' },
    { days: 'Subota', hours: '09:00 – 14:00' },
    { days: 'Nedjelja', hours: 'zatvoreno' },
  ],
  // Ugradiva Google karta (iframe, bez API ključa)
  map_url:
    'https://maps.google.com/maps?q=45.323630972844306,14.444177850435754&z=16&hl=hr&output=embed',
};

// Polja obrasca; poruke se kasnije spremaju u tablicu contact_messages
// (id, name, email, phone, message, created_at) preko POST /api/contact
export const contactFormFields = [
  { name: 'name', label: 'Ime i prezime', type: 'text', required: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true },
  { name: 'phone', label: 'Telefon', type: 'tel', required: false },
  { name: 'message', label: 'Poruka', type: 'textarea', required: true },
];
