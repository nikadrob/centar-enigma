-- Shema baze Centra Enigma. Stupci odgovaraju poljima u client/src/data/.
-- `image` sprema ključ iz client/src/data/resources.js, ne putanju.
-- JSON polja (features, working_hours) spremaju se kao tekst.

CREATE TABLE IF NOT EXISTS news (
  id           INTEGER PRIMARY KEY,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL DEFAULT '',
  body         TEXT NOT NULL DEFAULT '',
  image        TEXT,
  published_at TEXT NOT NULL            -- ISO datum, npr. 2026-11-10
);

CREATE TABLE IF NOT EXISTS trainings (
  id           INTEGER PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  duration_min INTEGER,
  level        TEXT,
  image        TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pricing (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  price_eur   REAL NOT NULL,
  period      TEXT NOT NULL,
  features    TEXT NOT NULL DEFAULT '[]',          -- JSON polje stringova
  highlighted INTEGER NOT NULL DEFAULT 0 CHECK (highlighted IN (0, 1)),
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about (
  id         INTEGER PRIMARY KEY,
  heading    TEXT NOT NULL,
  body       TEXT NOT NULL DEFAULT '',
  image      TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS trainers (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT,
  bio        TEXT NOT NULL DEFAULT '',
  image      TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Uvijek jedan redak
CREATE TABLE IF NOT EXISTS contact (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  address       TEXT,
  phone         TEXT,
  email         TEXT,
  working_hours TEXT NOT NULL DEFAULT '[]',        -- JSON: [{ days, hours }]
  map_url       TEXT
);

-- Poruke iz obrasca na stranici (POST /api/contact)
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
