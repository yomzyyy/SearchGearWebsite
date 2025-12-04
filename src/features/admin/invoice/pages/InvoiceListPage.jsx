import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdAdd, MdSearch, MdDescription, MdPictureAsPdf } from 'react-icons/md';

function InvoiceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  const [searchTerm, setSearchTerm] = useState('');

  const allInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV#00052',
      type: 'invoice',
      clientName: 'Accountinus Business Solution Inc.',
      date: '2025-03-10',
      dueDate: '2025-03-12',
      amount: 25300,
      status: 'pending',
    },
    {
      id: 2,
      invoiceNumber: 'QT#00054',
      type: 'quotation',
      clientName: 'Tech Solutions Corp.',
      date: '2025-03-08',
      dueDate: '2025-03-15',
      amount: 32000,
      status: 'paid',
    },
    {
      id: 3,
      invoiceNumber: 'INV#00051',
      type: 'invoice',
      clientName: 'ABC Manufacturing Ltd.',
      date: '2025-02-28',
      dueDate: '2025-03-05',
      amount: 18500,
      status: 'overdue',
    },
    {
      id: 4,
      invoiceNumber: 'INV#00050',
      type: 'invoice',
      clientName: 'Global Enterprises Inc.',
      date: '2025-03-05',
      dueDate: '2025-03-10',
      amount: 41200,
      status: 'paid',
    },
    {
      id: 5,
      invoiceNumber: 'QT#00053',
      type: 'quotation',
      clientName: 'Sunrise Travel Agency',
      date: '2025-03-09',
      dueDate: '2025-03-16',
      amount: 28750,
      status: 'pending',
    },
  ];

  const filteredInvoices = allInvoices.filter((invoice) => {
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const counts = {
    all: allInvoices.length,
    pending: allInvoices.filter((inv) => inv.status === 'pending').length,
    paid: allInvoices.filter((inv) => inv.status === 'paid').length,
    overdue: allInvoices.filter((inv) => inv.status === 'overdue').length,
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const handleFilterChange = (status) => {
    if (status === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ status });
    }
  };

  return (
    <div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Invoices & Quotations</h1>
        <Link
          to="/admin/invoice/create"
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <MdAdd className="text-xl" />
          <span>Create New</span>
        </Link>
      </div>

      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => handleFilterChange('pending')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              statusFilter === 'pending'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => handleFilterChange('paid')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              statusFilter === 'paid'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paid ({counts.paid})
          </button>
          <button
            onClick={() => handleFilterChange('overdue')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              statusFilter === 'overdue'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Overdue ({counts.overdue})
          </button>
        </div>

        
        <div className="relative">
          <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by client name or invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{invoice.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{invoice.clientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.dueDate}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₱{invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="text-primary hover:text-primary-dark transition-colors"
                          title="View Details"
                        >
                          <MdDescription className="text-xl" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Download PDF"
                        >
                          <MdPictureAsPdf className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InvoiceListPage;
