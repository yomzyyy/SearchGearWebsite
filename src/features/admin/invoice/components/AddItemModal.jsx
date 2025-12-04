import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

function AddItemModal({ isOpen, onClose, onAddItem, editingItem }) {
  const [formData, setFormData] = useState({
    description: '',
    quantity: 1,
    price: '',
    tax: 0,
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        description: editingItem.description,
        quantity: editingItem.quantity,
        price: editingItem.price,
        tax: editingItem.tax,
      });
    } else {
      setFormData({
        description: '',
        quantity: 1,
        price: '',
        tax: 0,
      });
    }
  }, [editingItem, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'tax' ? Number(value) : name === 'price' ? value : value,
    }));
  };

  const calculateAmount = () => {
    const price = parseFloat(formData.price) || 0;
    const quantity = formData.quantity;
    const taxRate = formData.tax / 100;
    const subtotal = price * quantity;
    const taxAmount = subtotal * taxRate;
    return subtotal + taxAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: editingItem ? editingItem.id : Date.now(),
      description: formData.description,
      quantity: formData.quantity,
      price: parseFloat(formData.price) || 0,
      tax: formData.tax,
      amount: calculateAmount(),
    };
    onAddItem(item);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingItem ? 'Edit Item' : 'Add Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Bus Rental - 49 seater tourist bus for 3 days"
              required
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
                Price (₱)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          
          <div className="mb-4">
            <label htmlFor="tax" className="block text-sm font-semibold text-gray-900 mb-2">
              Tax (%)
            </label>
            <input
              type="number"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          
          <div className="bg-blue-50 border border-primary rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Amount</span>
              <span className="text-xl font-bold text-primary">
                ₱{calculateAmount().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
