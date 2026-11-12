// Puni bazu početnim sadržajem. Podaci se uvoze izravno iz client/src/data/,
// tako da frontend i baza imaju isti sadržaj bez kopiranja.
// Briše i ponovno upisuje sadržajne tablice; poruke iz obrasca ostaju.
import db, { DB_PATH } from './db.js';
import { news } from '../../client/src/data/news.js';
import { trainings } from '../../client/src/data/trainings.js';
import { pricing } from '../../client/src/data/pricing.js';
import { about } from '../../client/src/data/about.js';
import { trainers } from '../../client/src/data/trainers.js';
import { contact } from '../../client/src/data/contact.js';

const tables = {
  news: news,
  trainings: trainings,
  pricing: pricing.map((p) => ({
    ...p,
    features: JSON.stringify(p.features),
    highlighted: p.highlighted ? 1 : 0,
  })),
  about: about,
  trainers: trainers,
  contact: [{ ...contact, working_hours: JSON.stringify(contact.working_hours) }],
};

// Upisuje samo stupce koji postoje u tablici
function insertAll(table, rows) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
  const used = columns.filter((c) => c in rows[0]);
  const insert = db.prepare(
    `INSERT INTO ${table} (${used.join(', ')}) VALUES (${used.map((c) => `@${c}`).join(', ')})`
  );
  for (const row of rows) insert.run(Object.fromEntries(used.map((c) => [c, row[c] ?? null])));
}

const seed = db.transaction(() => {
  for (const [table, rows] of Object.entries(tables)) {
    db.prepare(`DELETE FROM ${table}`).run();
    insertAll(table, rows);
  }
});

seed();

console.log(`Baza: ${DB_PATH}`);
for (const table of [...Object.keys(tables), 'contact_messages']) {
  const { n } = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get();
  console.log(`  ${table.padEnd(17)} ${n}`);
}
db.close();
