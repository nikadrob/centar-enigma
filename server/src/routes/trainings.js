import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/trainings: svi treninzi po sort_order
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM trainings ORDER BY sort_order, id').all());
});

export default router;
