import { useState } from 'react';
import TimeFilter from '../components/TimeFilter';
import TransactionSummary from '../components/TransactionSummary';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import TransactionTable from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';

function ReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('month');

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    console.log('Time filter changed to:', filter);
  };

  return (
    <div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Reports & Analytics</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <TimeFilter onFilterChange={handleFilterChange} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      
      <div className="mb-8">
        <TransactionSummary />
      </div>

      
      <div className="mb-8">
        <IncomeExpenseChart />
      </div>

      
      <div>
        <TransactionTable />
      </div>

      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default ReportsPage;
