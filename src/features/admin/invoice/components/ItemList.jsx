import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import AddItemModal from './AddItemModal';

function ItemList({ items, onItemsChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (item) => {
    if (editingItem) {
      const updatedItems = items.map((i) => (i.id === item.id ? item : i));
      onItemsChange(updatedItems);
      setEditingItem(null);
    } else {
      onItemsChange([...items, item]);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    onItemsChange(updatedItems);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-24">QTY</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 w-32">Price</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-24">Tax %</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 w-32">Amount</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">
                    ₱{item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.tax}%</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                    ₱{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-primary hover:text-primary-dark transition-colors"
                        title="Edit Item"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Item"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No items added yet. Click the button below to add items.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 hover:border-primary hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-primary font-medium"
      >
        <MdAdd className="text-xl" />
        <span>Add Item</span>
      </button>

      
      <AddItemModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddItem={handleAddItem}
        editingItem={editingItem}
      />
    </div>
  );
}

export default ItemList;
