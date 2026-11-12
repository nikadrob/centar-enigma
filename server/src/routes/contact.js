import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/contact: podaci za kontakt; working_hours kao polje
// (isti oblik kao client/src/data/contact.js)
router.get('/', (req, res) => {
  const row = db.prepare('SELECT * FROM contact WHERE id = 1').get();
  if (!row) return res.status(404).json({ error: 'Kontakt podaci nisu uneseni' });
  res.json({ ...row, working_hours: JSON.parse(row.working_hours) });
});

// Pravila za polja obrasca (usklađena s contactFormFields na frontendu)
const FIELDS = {
  name: { label: 'Ime i prezime', required: true, max: 100 },
  email: { label: 'E-mail', required: true, max: 200 },
  phone: { label: 'Telefon', required: false, max: 40 },
  message: { label: 'Poruka', required: true, max: 5000 },
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const values = {};
  const errors = {};

  for (const [name, rule] of Object.entries(FIELDS)) {
    const raw = body?.[name];
    const value = typeof raw === 'string' ? raw.trim() : '';

    if (raw !== undefined && raw !== null && typeof raw !== 'string') {
      errors[name] = `${rule.label} mora biti tekst`;
    } else if (rule.required && !value) {
      errors[name] = `${rule.label} je obavezno polje`;
    } else if (value.length > rule.max) {
      errors[name] = `${rule.label} može imati najviše ${rule.max} znakova`;
    }
    values[name] = value || null;
  }

  if (!errors.email && values.email && !EMAIL_RE.test(values.email)) {
    errors.email = 'E-mail adresa nije ispravna';
  }

  return { values, errors };
}

// POST /api/contact: sprema poruku iz obrasca
// 201 { id, created_at } | 400 { error, fields: { polje: poruka } }
router.post('/', (req, res) => {
  const { values, errors } = validate(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'Neispravni podaci', fields: errors });
  }

  const saved = db
    .prepare(
      `INSERT INTO contact_messages (name, email, phone, message)
       VALUES (@name, @email, @phone, @message)
       RETURNING id, created_at`
    )
    .get(values);

  res.status(201).json(saved);
});

export default router;
