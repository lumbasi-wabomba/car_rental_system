import api from './api';

export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  },

  // Get user's bookings
  getUserBookings: async () => {
    const response = await api.get('/bookings/');
    return response.data;
  },

  // Get single booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}/`);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}/`, bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}/`);
    return response.data;
  },

  // Admin only - Get all bookings
  getAllBookings: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/bookings/all/?${params.toString()}`);
    return response.data;
  },

  // Process payment
  processPayment: async (bookingId, paymentData) => {
    const response = await api.post(`/bookings/${bookingId}/payment/`, paymentData);
    return response.data;
  }
};
