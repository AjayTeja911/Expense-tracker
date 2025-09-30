import type { Expense } from './types';

const BASE = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';

export async function listExpenses(): Promise<Expense[]> {
  const r = await fetch(`${BASE}/expenses`);
  if (!r.ok) throw new Error('Failed to load expenses');
  return r.json();
}

export async function createExpense(payload: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> {
  const r = await fetch(`${BASE}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('Failed to create expense');
  return r.json();
}

export async function deleteExpense(id: number): Promise<void> {
  const r = await fetch(`${BASE}/expenses/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Failed to delete expense');
}

export async function totalAmount(): Promise<number> {
  const r = await fetch(`${BASE}/expenses/total`);
  if (!r.ok) throw new Error('Failed to fetch total');
  const { total } = await r.json();
  return total;
}

export async function byCategory(name: string): Promise<Expense[]> {
  const r = await fetch(`${BASE}/expenses/${encodeURIComponent(name)}`);
  if (!r.ok) throw new Error('Failed to fetch by category');
  return r.json();
}
