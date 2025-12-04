import { useState } from 'react';
import { MdClose } from 'react-icons/md';

function AddTransactionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const incomeCategories = ['Booking Revenue', 'Tour Package', 'Extra Services', 'Other Income'];
  const expenseCategories = ['Fuel', 'Maintenance', 'Salary', 'Insurance', 'Parking Fees', 'Tolls', 'Other Expenses'];

  const categories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', formData);
    onClose();
    setFormData({
      type: 'Income',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Transaction Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  checked={formData.type === 'Income'}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-700">Income</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Expense"
                  checked={formData.type === 'Expense'}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="ml-2 text-gray-700">Expense</span>
              </label>
            </div>
          </div>

          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-2">
              Amount (₱)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-900 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transaction details..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
