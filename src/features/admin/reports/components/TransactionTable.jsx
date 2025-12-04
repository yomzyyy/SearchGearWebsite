function TransactionTable() {
  const transactions = [
    {
      id: 1,
      date: 'Jan 15, 2025',
      type: 'Income',
      category: 'Booking',
      amount: 5000,
      description: 'Bus rental - Manila to Baguio',
    },
    {
      id: 2,
      date: 'Jan 14, 2025',
      type: 'Expense',
      category: 'Fuel',
      amount: 2000,
      description: 'Gas refill for Bus #5',
    },
    {
      id: 3,
      date: 'Jan 14, 2025',
      type: 'Income',
      category: 'Tour Package',
      amount: 7500,
      description: '3-day Batangas tour',
    },
    {
      id: 4,
      date: 'Jan 13, 2025',
      type: 'Expense',
      category: 'Maintenance',
      amount: 3000,
      description: 'Oil change and tire rotation',
    },
    {
      id: 5,
      date: 'Jan 12, 2025',
      type: 'Income',
      category: 'Booking',
      amount: 4500,
      description: 'Airport transfer service',
    },
    {
      id: 6,
      date: 'Jan 12, 2025',
      type: 'Expense',
      category: 'Salary',
      amount: 15000,
      description: 'Driver monthly salary',
    },
    {
      id: 7,
      date: 'Jan 11, 2025',
      type: 'Income',
      category: 'Extra Services',
      amount: 1200,
      description: 'Additional luggage fee',
    },
    {
      id: 8,
      date: 'Jan 10, 2025',
      type: 'Expense',
      category: 'Tolls',
      amount: 450,
      description: 'Toll fees - NLEX/SCTEX',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      transaction.type === 'Income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{transaction.category}</td>
                <td
                  className={`py-3 px-4 text-right font-semibold ${
                    transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'Income' ? '+' : '-'}₱{transaction.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-gray-600">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
