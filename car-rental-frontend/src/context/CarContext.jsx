import React, { createContext, useContext, useReducer } from 'react';

const CarContext = createContext();

const initialState = {
  cars: [],
  filteredCars: [],
  selectedCar: null,
  loading: false,
  error: null,
  filters: {
    location: '',
    pickupDate: '',
    returnDate: '',
    carType: '',
    priceRange: [0, 500]
  }
};

const carReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_CARS_SUCCESS':
      return {
        ...state,
        cars: action.payload,
        filteredCars: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CARS_FAILURE':
      return {
        ...state,
        cars: [],
        filteredCars: [],
        loading: false,
        error: action.payload
      };
    case 'SELECT_CAR':
      return {
        ...state,
        selectedCar: action.payload
      };
    case 'UPDATE_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters,
        filteredCars: filterCars(state.cars, newFilters)
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        filteredCars: state.cars
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const filterCars = (cars, filters) => {
  return cars.filter(car => {
    const matchesLocation = !filters.location || 
      car.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesCarType = !filters.carType || car.type === filters.carType;
    
    const matchesPrice = car.pricePerDay >= filters.priceRange[0] && 
      car.pricePerDay <= filters.priceRange[1];
    
    return matchesLocation && matchesCarType && matchesPrice;
  });
};

export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  const fetchCars = async () => {
    dispatch({ type: 'LOADING_START' });
    try {
      // Replace with actual API call
      const response = await fetch('/api/cars');
      
      if (response.ok) {
        const cars = await response.json();
        dispatch({ type: 'FETCH_CARS_SUCCESS', payload: cars });
      } else {
        throw new Error('Failed to fetch cars');
      }
    } catch (error) {
      dispatch({ type: 'FETCH_CARS_FAILURE', payload: error.message });
    }
  };

  const fetchCarById = async (id) => {
    dispatch({ type: 'LOADING_START' });
    try {
      // Replace with actual API call
      const response = await fetch(`/api/cars/${id}`);
      
      if (response.ok) {
        const car = await response.json();
        dispatch({ type: 'SELECT_CAR', payload: car });
        return car;
      } else {
        throw new Error('Failed to fetch car details');
      }
    } catch (error) {
      dispatch({ type: 'FETCH_CARS_FAILURE', payload: error.message });
      throw error;
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const selectCar = (car) => {
    dispatch({ type: 'SELECT_CAR', payload: car });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    fetchCars,
    fetchCarById,
    updateFilters,
    clearFilters,
    selectCar,
    clearError
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
