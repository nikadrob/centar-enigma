import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const here = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(here, '..', 'data', 'enigma.db');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

// Otvara bazu (stvara datoteku ako ne postoji) i primjenjuje shemu
const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));

export { DB_PATH };
export default db;
