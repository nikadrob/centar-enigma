import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/news: sve novosti, najnovije prve
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM news ORDER BY published_at DESC, id DESC').all());
});

export default router;
