/**
 * ═══════════════════════════════════════════════════════════
 * QUOTATION DETAIL MODAL - Submit Quotation Component
 * ═══════════════════════════════════════════════════════════
 *
 * This modal allows admin to:
 * 1. View full quotation details
 * 2. Enter pricing
 * 3. Add admin notes
 * 4. Submit quotation (sends email to customer)
 *
 * LEARNING POINTS:
 * - Modal/Dialog UI pattern
 * - Form handling with controlled components
 * - API POST request with body data
 * - Loading states and error handling
 * - Success feedback to user
 */

import { useState } from 'react';
import { MdClose, MdEmail, MdCheck } from 'react-icons/md';
import api from '../../../../core/api/axios.config';
import { ENDPOINTS } from '../../../../core/api/endpoints';

function QuotationDetailModal({ quotation, isOpen, onClose, onSuccess }) {
  // STATE FOR FORM FIELDS
  // Controlled components: React controls the input values
  const [estimatedPrice, setEstimatedPrice] = useState(quotation.estimatedPrice || '');
  const [adminNotes, setAdminNotes] = useState(quotation.adminNotes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /**
   * HANDLE SUBMIT QUOTATION
   *
   * This sends the quotation to the backend which:
   * 1. Saves the price and notes
   * 2. Sends email to customer
   * 3. Creates audit trail
   *
   * FORM VALIDATION:
   * Always validate before sending to API!
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    // VALIDATION
    if (!estimatedPrice || estimatedPrice <= 0) {
      setError('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // MAKE API REQUEST
      // POST request with body data (price and notes)
      const response = await api.post(
        ENDPOINTS.ADMIN_QUOTES_SUBMIT(quotation._id),
        {
          estimatedPrice: parseFloat(estimatedPrice), // Convert string to number
          adminNotes: adminNotes.trim(), // Remove extra whitespace
        }
      );

      if (response.data.success) {
        setSuccess(true);

        // SHOW SUCCESS MESSAGE
        // Check if email was sent successfully
        if (response.data.data.emailSent) {
          alert(
            `Quotation submitted successfully! Email sent to ${quotation.user.email}`
          );
        } else {
          alert(
            `Quotation saved, but email delivery failed. Please contact customer directly at ${quotation.user.email}`
          );
        }

        // CALLBACK TO PARENT
        // Notify parent component of success
        onSuccess(response.data.data.quote);
      }
    } catch (err) {
      console.error('Error submitting quotation:', err);
      setError(err.response?.data?.message || 'Failed to submit quotation');
    } finally {
      setLoading(false);
    }
  };

  /**
   * FORMAT CURRENCY INPUT
   *
   * Formats the price as user types
   * Removes non-numeric characters
   */
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, ''); // Only allow numbers and decimal
    setEstimatedPrice(value);
  };

  /**
   * FORMAT DATE FOR DISPLAY
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * FORMAT CURRENCY FOR DISPLAY
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  // MODAL OVERLAY
  // Darkens background and centers modal
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* BACKDROP - Click to close */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* MODAL CONTAINER */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* MODAL CONTENT */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* HEADER */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quotation Details
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Quote Number: {quotation.quoteNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* BODY */}
          <div className="px-6 py-6">
            {/* CUSTOMER INFORMATION */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Customer Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {quotation.user?.firstName} {quotation.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">
                    {quotation.user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">
                    {quotation.user?.phone || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Request Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(quotation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* TRIP DETAILS */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Trip Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pickup Location</p>
                    <p className="font-medium text-gray-900">
                      {quotation.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Drop-off Location</p>
                    <p className="font-medium text-gray-900">
                      {quotation.dropoffLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Departure Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(quotation.departureDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium text-gray-900">
                      {quotation.numberOfDays} day{quotation.numberOfDays > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bus Type</p>
                    <p className="font-medium text-gray-900">
                      {quotation.busType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Passengers</p>
                    <p className="font-medium text-gray-900">
                      {quotation.numberOfPassengers} passengers
                    </p>
                  </div>
                </div>
                {quotation.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-600">Special Requests</p>
                    <p className="font-medium text-gray-900">
                      {quotation.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* QUOTATION FORM */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Submit Quotation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* PRICE INPUT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Price (per day) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={estimatedPrice}
                      onChange={handlePriceChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  {estimatedPrice && quotation.numberOfDays > 1 && (
                    <p className="mt-2 text-sm text-gray-600">
                      Total for {quotation.numberOfDays} days:{' '}
                      <span className="font-semibold text-purple-600">
                        {formatCurrency(estimatedPrice * quotation.numberOfDays)}
                      </span>
                    </p>
                  )}
                </div>

                {/* ADMIN NOTES */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes (Optional)
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add any additional information or terms for the customer..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">
                    These notes will be included in the email to the customer
                  </p>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* SUCCESS MESSAGE */}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <MdCheck className="text-xl" />
                    <span>Quotation submitted successfully!</span>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <MdEmail className="text-xl" />
                        <span>Submit & Send Email</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What happens when you submit?</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Quote status will be updated to "Quoted"</li>
                <li>Customer will receive a professional email with the pricing</li>
                <li>All changes will be logged in the audit trail</li>
                <li>Customer can view the quotation in their dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationDetailModal;
