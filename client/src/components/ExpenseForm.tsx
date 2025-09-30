import { useState } from 'react';
import { createExpense } from '../api';


const CATEGORIES = ['food','transport','shopping','rent','utilities','entertainment','other'];


type Props = { onCreated: () => void };


export default function ExpenseForm({ onCreated }: Props) {
const [title, setTitle] = useState('');
const [amount, setAmount] = useState<number | ''>('');
const [category, setCategory] = useState('food');
const [date, setDate] = useState('');


async function submit(e: React.FormEvent) {
e.preventDefault();
if (amount === '' || Number.isNaN(Number(amount))) return;
await createExpense({ title, amount: Number(amount), category, spent_on: date || new Date().toISOString().slice(0,10), created_at: '' } as any);
setTitle(''); setAmount(''); setCategory('food'); setDate('');
onCreated();
}


return (
<div className="card p-3 shadow-sm">
<h4>Add Expense</h4>
<form onSubmit={submit}>
<div className="mb-3">
<label className="form-label">Title</label>
<input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
</div>
<div className="mb-3">
<label className="form-label">Amount</label>
<input type="number" step="1" className="form-control" value={amount} onChange={e=>setAmount(e.target.value === '' ? '' : Number(e.target.value))} required />
</div>
<div className="mb-3">
<label className="form-label">Category</label>
<select className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>
{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
</select>
</div>
<div className="mb-3">
<label className="form-label">Date</label>
<input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} />
</div>
<button className="btn btn-primary">Add</button>
</form>
</div>
);
}