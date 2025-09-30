import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses.js';
import { healthCheck } from './db.js';
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// health check endpoint
app.get('/health', async (_req, res) => {
  try {
    const ok = await healthCheck();
    res.json({ ok });
  } catch {
    res.status(500).json({ ok: false });
  }
});

// expense routes
app.use('/expenses', expensesRouter);

// start server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});