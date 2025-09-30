import type { Expense } from '../types';
import { deleteExpense } from '../api';

type Props = {
  items: Expense[];
  onDeleted: () => void;
};

export default function ExpenseList({ items, onDeleted }: Props) {
  if (items.length === 0) return <div className="alert alert-info">No expenses yet</div>;

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this expense?')) return;
    await deleteExpense(id);
    onDeleted();
  }

  return (
    <div className="card p-3 shadow-sm">
      <h4>Recent Expenses</h4>
      <ul className="list-group">
        {items.map(e => (
          <li
            key={e.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{e.title}</strong><br />
              <small className="text-muted">{new Date(e.spent_on).toLocaleDateString()}</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-secondary">{e.category}</span>
              <strong>₹{e.amount.toLocaleString()}</strong>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(e.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
