import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, X } from 'lucide-react';
import { useCars } from '../context/CarContext';
import './Cars.css';

const Cars = () => {
  const { cars, filteredCars, loading, error, filters, updateFilters, clearFilters, fetchCars } = useCars();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from your API
    // For demo purposes, we'll set some mock data
    const mockCars = [
      {
        id: 1,
        name: 'Toyota Camry',
        type: 'sedan',
        pricePerDay: 45,
        location: 'New York',
        image: '/api/placeholder/300/200',
        rating: 4.8,
        features: ['Automatic', 'AC', 'Bluetooth', 'GPS'],
        seats: 5,
        fuelType: 'Gasoline'
      },
      {
        id: 2,
        name: 'Honda CR-V',
        type: 'suv',
        pricePerDay: 65,
        location: 'Los Angeles',
        image: '/api/placeholder/300/200',
        rating: 4.7,
        features: ['Automatic', 'AC', 'Bluetooth', 'GPS', 'Backup Camera'],
        seats: 7,
        fuelType: 'Gasoline'
      },
      {
        id: 3,
        name: 'BMW 3 Series',
        type: 'luxury',
        pricePerDay: 95,
        location: 'Miami',
        image: '/api/placeholder/300/200',
        rating: 4.9,
        features: ['Automatic', 'AC', 'Leather Seats', 'Sunroof', 'Premium Audio'],
        seats: 5,
        fuelType: 'Gasoline'
      },
      {
        id: 4,
        name: 'Ford Focus',
        type: 'compact',
        pricePerDay: 35,
        location: 'Chicago',
        image: '/api/placeholder/300/200',
        rating: 4.5,
        features: ['Manual', 'AC', 'Bluetooth'],
        seats: 5,
        fuelType: 'Gasoline'
      },
      {
        id: 5,
        name: 'Nissan Altima',
        type: 'sedan',
        pricePerDay: 50,
        location: 'New York',
        image: '/api/placeholder/300/200',
        rating: 4.6,
        features: ['Automatic', 'AC', 'Bluetooth', 'GPS'],
        seats: 5,
        fuelType: 'Gasoline'
      },
      {
        id: 6,
        name: 'Mercedes-Benz C-Class',
        type: 'luxury',
        pricePerDay: 120,
        location: 'San Francisco',
        image: '/api/placeholder/300/200',
        rating: 4.8,
        features: ['Automatic', 'AC', 'Leather Seats', 'Sunroof', 'Premium Audio', 'Navigation'],
        seats: 5,
        fuelType: 'Gasoline'
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      fetchCars(); // This would normally make an API call
      // For demo, we'll directly update the context with mock data
    }, 500);
  }, []);

  const handleFilterChange = (filterName, value) => {
    updateFilters({ [filterName]: value });
  };

  const handlePriceChange = (value) => {
    updateFilters({ priceRange: [filters.priceRange[0], parseInt(value)] });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="loading">Loading cars...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cars-page">
      <div className="container">
        <div className="cars-header">
          <h1>Available Cars</h1>
          <button className="filter-toggle" onClick={toggleFilters}>
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="cars-content">
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="close-filters" onClick={toggleFilters}>
                <X size={20} />
              </button>
            </div>

            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input
                type="text"
                placeholder="Enter city"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Pick-up Date</label>
              <input
                type="date"
                value={filters.pickupDate}
                onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Return Date</label>
              <input
                type="date"
                value={filters.returnDate}
                onChange={(e) => handleFilterChange('returnDate', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Car Type</label>
              <select
                value={filters.carType}
                onChange={(e) => handleFilterChange('carType', e.target.value)}
                className="form-select"
              >
                <option value="">All Types</option>
                <option value="economy">Economy</option>
                <option value="compact">Compact</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Max Price per Day</label>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="price-slider"
              />
              <div className="price-display">
                $0 - ${filters.priceRange[1]}
              </div>
            </div>

            <button onClick={clearFilters} className="btn btn-outline clear-filters">
              Clear All Filters
            </button>
          </div>

          {/* Cars Grid */}
          <div className="cars-grid">
            {filteredCars.length === 0 ? (
              <div className="no-cars">
                <p>No cars found matching your criteria.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-3">
                {filteredCars.map((car) => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      <img src={car.image} alt={car.name} />
                    </div>
                    <div className="car-info">
                      <div className="car-header">
                        <h3>{car.name}</h3>
                        <div className="car-rating">
                          <Star size={16} fill="currentColor" />
                          <span>{car.rating}</span>
                        </div>
                      </div>
                      <p className="car-type">{car.type.charAt(0).toUpperCase() + car.type.slice(1)}</p>
                      <p className="car-location">{car.location}</p>
                      <div className="car-features">
                        {car.features?.slice(0, 3).map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                      <div className="car-footer">
                        <div className="car-price">
                          <span className="price">${car.pricePerDay}</span>
                          <span className="period">/day</span>
                        </div>
                        <div className="car-actions">
                          <Link to={`/cars/${car.id}`} className="btn btn-outline btn-sm">
                            View Details
                          </Link>
                          <Link to={`/booking/${car.id}`} className="btn btn-primary btn-sm">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
