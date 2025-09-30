import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, title, amount::float, category,
              to_char(spent_on,'YYYY-MM-DD') as spent_on,
              created_at
       FROM expenses
       ORDER BY spent_on DESC, id DESC`
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, amount, category, spent_on } = req.body ?? {};
    if (!title || amount == null || !category) {
      return res.status(400).json({ error: 'title, amount, category are required' });
    }
    const result = await pool.query(
      `INSERT INTO expenses (title, amount, category, spent_on)
       VALUES ($1, $2, $3, COALESCE($4::date, CURRENT_DATE))
       RETURNING id, title, amount::float, category,
                 to_char(spent_on,'YYYY-MM-DD') as spent_on,
                 created_at`,
      [title, amount, category, spent_on]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

router.get('/total', async (_req, res, next) => {
  try {
    const r = await pool.query('SELECT COALESCE(SUM(amount),0)::float AS total FROM expenses');
    res.json({ total: r.rows[0].total });
  } catch (err) { next(err); }
});

router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const r = await pool.query(
      `SELECT id, title, amount::float, category,
              to_char(spent_on,'YYYY-MM-DD') as spent_on,
              created_at
       FROM expenses
       WHERE LOWER(category) = LOWER($1)
       ORDER BY spent_on DESC, id DESC`,
      [name]
    );
    res.json(r.rows);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM expenses WHERE id = $1 RETURNING id',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});


export default router;
