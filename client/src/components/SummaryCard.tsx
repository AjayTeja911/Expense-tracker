import { useEffect, useState } from 'react';
import { totalAmount } from '../api';

export default function SummaryCard({ refreshKey }: { refreshKey: number }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    totalAmount().then(setTotal);
  }, [refreshKey]);

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h4>Total Spend</h4>
      <p className="text-muted">Sum of all recorded expenses</p>
      <h2>₹{total?.toLocaleString() ?? '—'}</h2>
    </div>
  );
}
