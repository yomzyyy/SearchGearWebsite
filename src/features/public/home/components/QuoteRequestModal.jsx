import { useState, useEffect } from 'react';
import { MdClose, MdLocationOn, MdPeople, MdDirectionsBus, MdDateRange, MdEventNote } from 'react-icons/md';
import axios from 'axios';
import { ENDPOINTS } from '../../../../core/api/endpoints';

const QuoteRequestModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    numberOfDays: 1,
    busType: '49-seater',
    numberOfPassengers: 1,
    departureDate: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMaxPassengers = () => {
    return formData.busType === '49-seater' ? 49 : 60;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');
  };

  const handleBusTypeChange = (e) => {
    const newBusType = e.target.value;
    const maxPassengers = newBusType === '49-seater' ? 49 : 60;

    setFormData(prev => ({
      ...prev,
      busType: newBusType,
      numberOfPassengers: prev.numberOfPassengers > maxPassengers ? maxPassengers : prev.numberOfPassengers
    }));

    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.pickupLocation.trim()) {
      setError('Please enter pickup location');
      return false;
    }
    if (!formData.dropoffLocation.trim()) {
      setError('Please enter drop-off location');
      return false;
    }
    if (!formData.departureDate) {
      setError('Please select departure date');
      return false;
    }
    if (formData.numberOfDays < 1) {
      setError('Number of days must be at least 1');
      return false;
    }
    if (formData.numberOfPassengers < 1) {
      setError('Number of passengers must be at least 1');
      return false;
    }
    if (formData.numberOfPassengers > getMaxPassengers()) {
      setError(`Number of passengers cannot exceed ${getMaxPassengers()} for ${formData.busType}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api${ENDPOINTS.QUOTES_CREATE}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          resetForm();
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error('Quote request error:', err);
      setError(err.response?.data?.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pickupLocation: '',
      dropoffLocation: '',
      numberOfDays: 1,
      busType: '49-seater',
      numberOfPassengers: 1,
      departureDate: '',
      specialRequests: ''
    });
    setError('');
    setSuccess(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the details for your bus rental</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        
        {success && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Quote request submitted successfully!</p>
            <p className="text-sm text-green-700 mt-1">We'll review your request and get back to you soon.</p>
          </div>
        )}

        
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-semibold text-gray-900 mb-2">
              Pickup Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLocationOn className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., Manila, Metro Manila"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          
          <div>
            <label htmlFor="dropoffLocation" className="block text-sm font-semibold text-gray-900 mb-2">
              Drop-off Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLocationOn className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                id="dropoffLocation"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                placeholder="e.g., Baguio City, Benguet"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label htmlFor="departureDate" className="block text-sm font-semibold text-gray-900 mb-2">
                Departure Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdDateRange className="text-gray-400 text-xl" />
                </div>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            
            <div>
              <label htmlFor="numberOfDays" className="block text-sm font-semibold text-gray-900 mb-2">
                Number of Days *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEventNote className="text-gray-400 text-xl" />
                </div>
                <input
                  type="number"
                  id="numberOfDays"
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label htmlFor="busType" className="block text-sm font-semibold text-gray-900 mb-2">
                Bus Type *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdDirectionsBus className="text-gray-400 text-xl" />
                </div>
                <select
                  id="busType"
                  name="busType"
                  value={formData.busType}
                  onChange={handleBusTypeChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="49-seater">Tourist Bus - 49 Seater</option>
                  <option value="60-seater">Tourist Bus - 60 Seater</option>
                </select>
              </div>
            </div>

            
            <div>
              <label htmlFor="numberOfPassengers" className="block text-sm font-semibold text-gray-900 mb-2">
                Number of Passengers *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPeople className="text-gray-400 text-xl" />
                </div>
                <input
                  type="number"
                  id="numberOfPassengers"
                  name="numberOfPassengers"
                  value={formData.numberOfPassengers}
                  onChange={handleChange}
                  min="1"
                  max={getMaxPassengers()}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Max: {getMaxPassengers()} passengers for {formData.busType}
              </p>
            </div>
          </div>

          
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-900 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requirements or requests?"
              maxLength="500"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.specialRequests.length}/500 characters
            </p>
          </div>

          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : success ? (
                'Submitted!'
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestModal;
