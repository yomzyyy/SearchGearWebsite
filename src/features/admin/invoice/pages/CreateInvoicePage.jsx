import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSave, MdPictureAsPdf } from 'react-icons/md';
import ClientSelector from '../components/ClientSelector';
import ItemList from '../components/ItemList';

function CreateInvoicePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'invoice',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'pending',
    discount: 0,
    shipping: 0,
    notes: '',
    terms: {
      paymentTerms: '5k down payment per bus upon confirmation of booking, full payment on the day of service',
      inclusions: [
        'Tourist bus 49 seaters',
        'Driver\'s fee',
        'Toll/Gas/Parking fees',
        'Insurance',
      ],
      amenities: ['Videoke', 'Air-conditioned', 'Microphone', 'Smart TV', 'Mini-Ref'],
    },
    billFrom: {
      companyName: 'SearchGear Transport',
      address: 'B9L4 Falcon St. Vallejo Place Pasong Buaya Imus Cavite',
      phone: '09625374267',
      email: 'contact@searchgear.com',
    },
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const prefix = formData.type === 'invoice' ? 'INV#' : 'QT#';
    const number = String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0');
    setFormData((prev) => ({ ...prev, invoiceNumber: `${prefix}${number}` }));
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'discount' || name === 'shipping' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => {
      const itemSubtotal = item.price * item.quantity;
      return sum + itemSubtotal;
    }, 0);

    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.price * item.quantity;
      const itemTax = itemSubtotal * (item.tax / 100);
      return sum + itemTax;
    }, 0);

    const discount = formData.discount || 0;
    const shipping = formData.shipping || 0;
    const total = subtotal + totalTax - discount + shipping;

    return {
      subtotal,
      tax: totalTax,
      discount,
      shipping,
      total,
    };
  };

  const totals = calculateTotals();

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }
    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    const invoiceData = {
      ...formData,
      client: selectedClient,
      items,
      totals,
    };

    console.log('Invoice saved:', invoiceData);
    alert('Invoice saved successfully!');
    navigate('/admin/invoice');
  };

  return (
    <div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/invoice"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MdArrowBack className="text-2xl" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <MdSave className="text-xl" />
            <span>Save</span>
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            title="Generate PDF (Coming Soon)"
          >
            <MdPictureAsPdf className="text-xl" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="invoice"
                        checked={formData.type === 'invoice'}
                        onChange={() => handleTypeChange('invoice')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">Invoice</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="quotation"
                        checked={formData.type === 'quotation'}
                        onChange={() => handleTypeChange('quotation')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">Quotation</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="invoiceNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                    {formData.type === 'invoice' ? 'Invoice' : 'Quotation'} Number
                  </label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-900 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bill From</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{formData.billFrom.companyName}</h3>
                <p className="text-sm text-gray-600">{formData.billFrom.address}</p>
                <p className="text-sm text-gray-600">{formData.billFrom.phone}</p>
                <p className="text-sm text-gray-600">{formData.billFrom.email}</p>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bill To</h2>
              <ClientSelector selectedClient={selectedClient} onSelectClient={setSelectedClient} />
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Items</h2>
              <ItemList items={items} onItemsChange={setItems} />
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes or instructions..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          
          <div className="space-y-6">
            
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₱{totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ₱{totals.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                
                <div className="flex justify-between items-center text-gray-700">
                  <span>Discount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">₱</span>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                
                <div className="flex justify-between items-center text-gray-700">
                  <span>Shipping</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">₱</span>
                    <input
                      type="number"
                      name="shipping"
                      value={formData.shipping}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₱{totals.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Terms</h2>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
                <p className="text-sm text-gray-600">{formData.terms.paymentTerms}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Inclusions</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.terms.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.terms.amenities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateInvoicePage;
