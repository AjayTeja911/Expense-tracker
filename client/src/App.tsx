import { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';
import SummaryCard from './components/SummaryCard';
import { listExpenses } from './api';
import type { Expense } from './types';

export default function App() {
  const [rows, setRows] = useState<Expense[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  async function refresh() {
    const data = await listExpenses();
    setRows(data);
    setRefreshKey(k => k + 1); 
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="container py-4">
      {/* Summary */}
      <SummaryCard refreshKey={refreshKey} />

      {/* Add expense + filter */}
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <ExpenseForm onCreated={refresh} />
        </div>
        <div className="col-md-6 mb-3">
          <Filters />
        </div>
      </div>

      {/* Always show all expenses with delete option */}
      <ExpenseList items={rows} onDeleted={refresh} />
    </div>
  );
}
