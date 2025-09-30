import dotenv from "dotenv";
import { Pool } from 'pg';
dotenv.config();

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error('POSTGRES_URL is not set in .env');
}

export const pool = new Pool({ connectionString });

export async function healthCheck() {
  const r = await pool.query('SELECT 1 as ok');
  return r.rows[0]?.ok === 1;
}
