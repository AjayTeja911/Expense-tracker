import { useState } from 'react';
import { byCategory } from '../api';
import type { Expense } from '../types';

export default function Filters() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Expense[]>([]);

  async function run() {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const rows = await byCategory(name.trim());
      setResults(rows);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-3 shadow-sm">
      <h4>Filter by category</h4>
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="e.g., food"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={run}
          disabled={!name.trim() || loading}
        >
          {loading ? 'Loading…' : 'Apply'}
        </button>
      </div>

      {results.length > 0 && (
        <ul className="list-group">
          {results.map(e => (
            <li
              key={e.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{e.title}</strong>
                <br />
                <small className="text-muted">
                  {new Date(e.spent_on).toLocaleDateString()}
                </small>
              </div>
              <div>
                <span className="badge bg-secondary me-2">{e.category}</span>
                <strong>₹{e.amount.toLocaleString()}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && name && !loading && (
        <div className="text-muted">No results found</div>
      )}
    </div>
  );
}
