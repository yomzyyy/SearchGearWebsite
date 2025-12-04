/**
 * ═══════════════════════════════════════════════════════════
 * QUOTATION LIST PAGE - Admin View
 * ═══════════════════════════════════════════════════════════
 *
 * This page displays all quotation requests from customers.
 * Admin can filter, search, and respond to quotations.
 *
 * FEATURES:
 * - Filter by status (pending, quoted, approved, rejected)
 * - Search by customer name or quote number
 * - View quotation details
 * - Submit quotation with pricing
 * - Real-time updates
 *
 * LEARNING POINTS:
 * - React Hooks (useState, useEffect)
 * - API integration with axios
 * - Conditional rendering
 * - Component composition
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdSearch, MdEmail, MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import api from '../../../../core/api/axios.config';
import { ENDPOINTS } from '../../../../core/api/endpoints';
import QuotationDetailModal from '../components/QuotationDetailModal';

function QuotationListPage() {
  // REACT ROUTER: Get URL search params for filtering
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  // STATE MANAGEMENT
  // Think of state as "memory" for your component
  const [searchTerm, setSearchTerm] = useState('');
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * FETCH QUOTATIONS FROM API
   *
   * useEffect runs when component mounts (loads)
   * Think of it as "do this when the page loads"
   *
   * WHY ASYNC/AWAIT?
   * - API calls take time (network request)
   * - We don't want to freeze the UI while waiting
   * - async/await makes asynchronous code look synchronous
   */
  useEffect(() => {
    fetchQuotations();
  }, []); // Empty array means "run once when component mounts"

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      setError(null);

      // MAKE API REQUEST
      // api.get() returns a Promise, we await it
      const response = await api.get(ENDPOINTS.ADMIN_QUOTES_ALL);

      // UPDATE STATE with data from API
      if (response.data.success) {
        setQuotations(response.data.data);
      }
    } catch (err) {
      // ERROR HANDLING
      console.error('Error fetching quotations:', err);
      setError(err.response?.data?.message || 'Failed to load quotations');
    } finally {
      // ALWAYS runs (success or error)
      setLoading(false);
    }
  };

  /**
   * FILTER AND SEARCH LOGIC
   *
   * This filters the quotations array based on:
   * 1. Status filter (pending, quoted, etc.)
   * 2. Search term (client name or quote number)
   *
   * ARRAY METHODS:
   * - .filter() creates a new array with items that pass a test
   * - Returns true to keep item, false to remove it
   */
  const filteredQuotations = quotations.filter((quote) => {
    // Check if status matches filter
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;

    // Check if search term matches client name or quote number
    const clientName = `${quote.user?.firstName} ${quote.user?.lastName}`.toLowerCase();
    const matchesSearch =
      clientName.includes(searchTerm.toLowerCase()) ||
      quote.quoteNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    // Keep item only if BOTH conditions are true
    return matchesStatus && matchesSearch;
  });

  /**
   * CALCULATE COUNTS FOR FILTER BADGES
   *
   * Shows how many quotes are in each status
   * Used for the filter buttons at the top
   */
  const counts = {
    all: quotations.length,
    pending: quotations.filter((q) => q.status === 'pending').length,
    quoted: quotations.filter((q) => q.status === 'quoted').length,
    approved: quotations.filter((q) => q.status === 'approved').length,
    rejected: quotations.filter((q) => q.status === 'rejected').length,
  };

  /**
   * STATUS BADGE STYLING
   *
   * Returns Tailwind CSS classes based on status
   * This gives each status a different color
   */
  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      quoted: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  /**
   * HANDLE VIEW QUOTATION
   *
   * Opens modal with quotation details
   */
  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setIsModalOpen(true);
  };

  /**
   * HANDLE DELETE QUOTATION
   *
   * Deletes a quotation after confirmation
   */
  const handleDelete = async (quotationId) => {
    // CONFIRM DIALOG
    // Always confirm before deleting!
    if (!window.confirm('Are you sure you want to delete this quotation request?')) {
      return;
    }

    try {
      await api.delete(ENDPOINTS.ADMIN_QUOTES_DELETE(quotationId));

      // UPDATE STATE: Remove deleted quotation from array
      // .filter() creates new array without the deleted item
      setQuotations(quotations.filter((q) => q._id !== quotationId));

      alert('Quotation deleted successfully');
    } catch (err) {
      console.error('Error deleting quotation:', err);
      alert(err.response?.data?.message || 'Failed to delete quotation');
    }
  };

  /**
   * FORMAT CURRENCY
   *
   * Converts number to currency string with commas
   * Example: 1500 becomes "$1,500.00"
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  /**
   * FORMAT DATE
   *
   * Converts ISO date string to readable format
   * Example: "2025-12-04T00:00:00.000Z" becomes "Dec 4, 2025"
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quotations...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={fetchQuotations}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // MAIN RENDER
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quotation Requests</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer quotation requests</p>
        </div>
      </div>

      {/* STATUS FILTER TABS */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { key: 'all', label: 'All Quotations' },
          { key: 'pending', label: 'Pending' },
          { key: 'quoted', label: 'Quoted' },
          { key: 'approved', label: 'Approved' },
          { key: 'rejected', label: 'Rejected' },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSearchParams({ status: filter.key })}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              statusFilter === filter.key
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter.label}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                statusFilter === filter.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {counts[filter.key]}
            </span>
          </button>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by customer name or quote number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* QUOTATIONS TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quote #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm
                      ? 'No quotations found matching your search.'
                      : 'No quotation requests yet.'}
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((quotation) => (
                  <tr key={quotation._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-purple-600">
                        {quotation.quoteNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {quotation.user?.firstName} {quotation.user?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{quotation.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{quotation.pickupLocation}</div>
                      <div className="text-sm text-gray-500">to {quotation.dropoffLocation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {quotation.busType} | {quotation.numberOfPassengers} pax
                      </div>
                      <div className="text-sm text-gray-500">
                        {quotation.numberOfDays} day(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {quotation.estimatedPrice
                          ? formatCurrency(quotation.estimatedPrice)
                          : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          quotation.status
                        )}`}
                      >
                        {quotation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(quotation.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewQuotation(quotation)}
                          className="text-purple-600 hover:text-purple-900"
                          title="View & Respond"
                        >
                          <MdRemoveRedEye className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(quotation._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <MdDelete className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUOTATION DETAIL MODAL */}
      {isModalOpen && selectedQuotation && (
        <QuotationDetailModal
          quotation={selectedQuotation}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedQuotation(null);
          }}
          onSuccess={(updatedQuotation) => {
            // Update the quotation in the list
            setQuotations(
              quotations.map((q) =>
                q._id === updatedQuotation._id ? updatedQuotation : q
              )
            );
            setIsModalOpen(false);
            setSelectedQuotation(null);
          }}
        />
      )}
    </div>
  );
}

export default QuotationListPage;
