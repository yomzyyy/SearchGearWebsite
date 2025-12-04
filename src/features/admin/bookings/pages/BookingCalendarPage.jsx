/**
 * BOOKING CALENDAR PAGE
 *
 * Interactive calendar view showing all bookings with:
 * - Month/Week/Day views
 * - Color coding by booking type
 * - Click to view details
 * - Filter options
 *
 * COLOR LEGEND:
 * - Yellow: Quotation (not confirmed yet)
 * - Blue: Confirmed booking
 * - Green: Paid booking
 * - Red: Cancelled
 */

import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../bookings.css';
import { MdCalendarToday, MdList, MdFilterList } from 'react-icons/md';
import api from '../../../../core/api/axios.config';
import { ENDPOINTS } from '../../../../core/api/endpoints';
import BookingDetailModal from '../components/BookingDetailModal';

// Setup moment localizer for calendar
const localizer = momentLocalizer(moment);

function BookingCalendarPage() {
  // STATE
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterType, setFilterType] = useState('all');

  /**
   * FETCH BOOKINGS FROM API
   */
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      // Calculate date range based on current view (month)
      const start = moment(currentDate).startOf('month').toDate();
      const end = moment(currentDate).endOf('month').add(1, 'month').toDate();

      // Fetch calendar events
      const response = await api.get(ENDPOINTS.ADMIN_BOOKINGS_CALENDAR, {
        params: {
          start: start.toISOString(),
          end: end.toISOString()
        }
      });

      if (response.data.success) {
        const eventsData = response.data.data;
        setEvents(eventsData);

        // Also fetch full booking data for list view
        const bookingsResponse = await api.get(ENDPOINTS.ADMIN_BOOKINGS);
        if (bookingsResponse.data.success) {
          setBookings(bookingsResponse.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /**
   * EVENT STYLE GETTER
   * Returns custom styles based on booking type
   *
   * COLOR CODING:
   * - Quotation: Yellow (#FCD34D)
   * - Confirmed: Blue (#60A5FA)
   * - Paid: Green (#34D399)
   * - Cancelled: Red (#F87171)
   */
  const eventStyleGetter = (event) => {
    const { bookingType, status } = event.resource || {};

    let backgroundColor = '#9CA3AF'; // Default gray
    let borderColor = '#6B7280';

    if (status === 'cancelled') {
      backgroundColor = '#F87171'; // Red
      borderColor = '#DC2626';
    } else {
      switch (bookingType) {
        case 'quotation':
          backgroundColor = '#FCD34D'; // Yellow
          borderColor = '#F59E0B';
          break;
        case 'confirmed':
          backgroundColor = '#60A5FA'; // Blue
          borderColor = '#3B82F6';
          break;
        case 'paid':
          backgroundColor = '#34D399'; // Green
          borderColor = '#10B981';
          break;
        default:
          break;
      }
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '6px',
        color: '#1F2937',
        fontWeight: '600',
        fontSize: '13px',
        padding: '4px 8px',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
      }
    };
  };

  /**
   * HANDLE EVENT CLICK
   * Opens modal with booking details
   */
  const handleSelectEvent = (event) => {
    setSelectedBooking(event.resource.booking);
    setIsModalOpen(true);
  };

  /**
   * HANDLE NAVIGATE
   * Updates current date when user navigates calendar
   */
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  /**
   * FILTER EVENTS BY TYPE
   */
  const filteredEvents = filterType === 'all'
    ? events
    : events.filter(e => e.resource?.bookingType === filterType);

  const filteredBookings = filterType === 'all'
    ? bookings
    : bookings.filter(b => b.bookingType === filterType);

  /**
   * FORMAT DATE
   */
  const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY');
  };

  /**
   * FORMAT CURRENCY
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  /**
   * GET STATUS BADGE
   */
  const getStatusBadge = (type, status) => {
    if (status === 'cancelled') {
      return 'bg-red-100 text-red-800';
    }

    switch (type) {
      case 'quotation':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings Calendar</h1>
          <p className="text-gray-600 mt-1">View and manage all bookings in calendar view</p>
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <MdCalendarToday />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'list'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <MdList />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* FILTER AND LEGEND */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        {/* FILTER */}
        <div className="flex items-center gap-2">
          <MdFilterList className="text-gray-500" />
          <span className="text-sm text-gray-600">Filter:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="quotation">Quotations</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* LEGEND */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded border-2 border-yellow-600"></div>
            <span className="text-gray-600">Quotation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded border-2 border-blue-600"></div>
            <span className="text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded border-2 border-green-600"></div>
            <span className="text-gray-600">Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded border-2 border-red-600"></div>
            <span className="text-gray-600">Cancelled</span>
          </div>
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {view === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ minHeight: '900px' }}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '850px' }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            view="month"
            onNavigate={handleNavigate}
            date={currentDate}
            views={['month']}
            popup
            toolbar={true}
          />
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Booking #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsModalOpen(true);
                      }}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-purple-600">
                          {booking.bookingNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.firstName} {booking.user?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{booking.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{booking.pickupLocation}</div>
                        <div className="text-sm text-gray-500">to {booking.dropoffLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(booking.departureDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.numberOfDays} day(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.busType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalPrice)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            booking.bookingType,
                            booking.status
                          )}`}
                        >
                          {booking.bookingType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOOKING DETAIL MODAL */}
      {isModalOpen && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
          onSuccess={() => {
            fetchBookings();
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}

export default BookingCalendarPage;
