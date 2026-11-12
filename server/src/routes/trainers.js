import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/trainers: treneri po sort_order
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM trainers ORDER BY sort_order, id').all());
});

export default router;
