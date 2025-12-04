/**
 * BOOKING DETAIL MODAL
 *
 * Shows complete booking information and allows:
 * - View all booking details
 * - Update booking status
 * - Mark as paid
 * - Cancel booking
 */

import { useState } from 'react';
import { MdClose, MdCheck, MdCancel, MdPayment } from 'react-icons/md';
import moment from 'moment';
import api from '../../../../core/api/axios.config';
import { ENDPOINTS } from '../../../../core/api/endpoints';

function BookingDetailModal({ booking, isOpen, onClose, onSuccess }) {
  const [updating, setUpdating] = useState(false);

  if (!isOpen) return null;

  /**
   * MARK AS PAID
   */
  const handleMarkAsPaid = async () => {
    if (!window.confirm('Mark this booking as paid?')) return;

    try {
      setUpdating(true);

      const response = await api.patch(
        ENDPOINTS.ADMIN_BOOKING_MARK_PAID(booking._id),
        {
          paymentMethod: 'bank-transfer',
          paymentDate: new Date().toISOString()
        }
      );

      if (response.data.success) {
        alert('Booking marked as paid successfully!');
        onSuccess();
      }
    } catch (error) {
      console.error('Error marking as paid:', error);
      alert(error.response?.data?.message || 'Failed to update booking');
    } finally {
      setUpdating(false);
    }
  };

  /**
   * UPDATE STATUS
   */
  const handleUpdateStatus = async (newStatus) => {
    if (!window.confirm(`Change booking status to "${newStatus}"?`)) return;

    try {
      setUpdating(true);

      const response = await api.patch(
        ENDPOINTS.ADMIN_BOOKING_UPDATE_STATUS(booking._id),
        { status: newStatus }
      );

      if (response.data.success) {
        alert('Booking status updated successfully!');
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  /**
   * CANCEL BOOKING
   */
  const handleCancel = async () => {
    const reason = window.prompt('Enter cancellation reason:');
    if (!reason) return;

    try {
      setUpdating(true);

      const response = await api.patch(
        ENDPOINTS.ADMIN_BOOKING_CANCEL(booking._id),
        { reason }
      );

      if (response.data.success) {
        alert('Booking cancelled successfully!');
        onSuccess();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM D, YYYY');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (type, status) => {
    if (status === 'cancelled') return 'bg-red-100 text-red-800 border-red-300';
    switch (type) {
      case 'quotation': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paid': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* HEADER */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {booking.bookingNumber}
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
            {/* STATUS BADGES */}
            <div className="mb-6 flex gap-3">
              <span className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(booking.bookingType, booking.status)}`}>
                {booking.bookingType}
              </span>
              <span className="px-4 py-2 rounded-lg border-2 bg-gray-100 text-gray-800 border-gray-300 font-semibold">
                {booking.status}
              </span>
              {booking.paymentStatus && (
                <span className={`px-4 py-2 rounded-lg border-2 font-semibold ${
                  booking.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                }`}>
                  Payment: {booking.paymentStatus}
                </span>
              )}
            </div>

            {/* CUSTOMER INFO */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {booking.user?.firstName} {booking.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{booking.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">
                    {booking.user?.phone || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* TRIP DETAILS */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Trip Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pickup Location</p>
                    <p className="font-medium text-gray-900">{booking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Drop-off Location</p>
                    <p className="font-medium text-gray-900">{booking.dropoffLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Departure Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(booking.departureDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium text-gray-900">
                      {booking.numberOfDays} day{booking.numberOfDays > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bus Type</p>
                    <p className="font-medium text-gray-900">{booking.busType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Passengers</p>
                    <p className="font-medium text-gray-900">
                      {booking.numberOfPassengers} passengers
                    </p>
                  </div>
                </div>
                {booking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-600">Special Requests</p>
                    <p className="font-medium text-gray-900">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            {/* PRICING */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Price per Day</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(booking.pricePerDay)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Days</p>
                    <p className="text-xl font-bold text-gray-900">
                      {booking.numberOfDays} day{booking.numberOfDays > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="border-t border-purple-200 pt-4">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatCurrency(booking.totalPrice)}
                  </p>
                </div>
                {booking.paymentMethod && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {booking.paymentMethod.replace('-', ' ')}
                    </p>
                    {booking.paymentDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Paid on: {formatDate(booking.paymentDate)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ADMIN NOTES */}
            {booking.adminNotes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Notes</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800">{booking.adminNotes}</p>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            {booking.status !== 'cancelled' && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {booking.paymentStatus !== 'paid' && (
                  <button
                    onClick={handleMarkAsPaid}
                    disabled={updating}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <MdPayment className="text-xl" />
                    <span>Mark as Paid</span>
                  </button>
                )}

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus('in-progress')}
                    disabled={updating}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <MdCheck className="text-xl" />
                    <span>Start Trip</span>
                  </button>
                )}

                {booking.status === 'in-progress' && (
                  <button
                    onClick={() => handleUpdateStatus('completed')}
                    disabled={updating}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    <MdCheck className="text-xl" />
                    <span>Complete Trip</span>
                  </button>
                )}

                <button
                  onClick={handleCancel}
                  disabled={updating}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <MdCancel className="text-xl" />
                  <span>Cancel Booking</span>
                </button>
              </div>
            )}

            {/* CANCELLATION INFO */}
            {booking.status === 'cancelled' && booking.cancellationReason && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Cancellation Information</h4>
                <p className="text-red-800">{booking.cancellationReason}</p>
                {booking.cancelledAt && (
                  <p className="text-sm text-red-600 mt-2">
                    Cancelled on: {formatDate(booking.cancelledAt)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailModal;
