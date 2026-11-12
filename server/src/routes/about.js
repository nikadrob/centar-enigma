import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/about: blokovi teksta po sort_order
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM about ORDER BY sort_order, id').all());
});

export default router;
