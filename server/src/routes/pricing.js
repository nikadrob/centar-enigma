import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/pricing: paketi po sort_order; features kao polje, highlighted kao boolean
// (isti oblik kao client/src/data/pricing.js)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM pricing ORDER BY sort_order, id').all();
  res.json(
    rows.map((row) => ({
      ...row,
      features: JSON.parse(row.features),
      highlighted: row.highlighted === 1,
    }))
  );
});

export default router;
