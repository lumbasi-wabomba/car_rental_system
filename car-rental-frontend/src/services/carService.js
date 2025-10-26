import api from './api';

export const carService = {
  // Get all cars with optional filters
  getAllCars: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/cars/?${params.toString()}`);
    return response.data;
  },

  // Get single car by ID
  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}/`);
    return response.data;
  },

  // Search cars by location and dates
  searchCars: async (searchData) => {
    const response = await api.post('/cars/search/', searchData);
    return response.data;
  },

  // Get car availability
  checkAvailability: async (carId, pickupDate, returnDate) => {
    const response = await api.post(`/cars/${carId}/availability/`, {
      pickup_date: pickupDate,
      return_date: returnDate
    });
    return response.data;
  },

  // Admin only - Create new car
  createCar: async (carData) => {
    const response = await api.post('/cars/', carData);
    return response.data;
  },

  // Admin only - Update car
  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}/`, carData);
    return response.data;
  },

  // Admin only - Delete car
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}/`);
    return response.data;
  }
};
