import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, Shield } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Search size={48} />,
      title: 'Easy Search',
      description: 'Find the perfect car for your needs with our advanced search filters.'
    },
    {
      icon: <Star size={48} />,
      title: 'Quality Vehicles',
      description: 'All our cars are well-maintained and regularly serviced for your safety.'
    },
    {
      icon: <Users size={48} />,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to assist you.'
    },
    {
      icon: <Shield size={48} />,
      title: 'Secure Booking',
      description: 'Your personal and payment information is protected with advanced security.'
    }
  ];

  const popularCars = [
    {
      id: 1,
      name: 'Toyota Camry',
      type: 'Sedan',
      price: 45,
      image: '/api/placeholder/300/200',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Honda CR-V',
      type: 'SUV',
      price: 65,
      image: '/api/placeholder/300/200',
      rating: 4.7
    },
    {
      id: 3,
      name: 'BMW 3 Series',
      type: 'Luxury',
      price: 95,
      image: '/api/placeholder/300/200',
      rating: 4.9
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Find Your Perfect Rental Car</h1>
              <p>Choose from our wide selection of premium vehicles for your next adventure</p>
              <div className="hero-buttons">
                <Link to="/cars" className="btn btn-primary">Browse Cars</Link>
                <Link to="/register" className="btn btn-outline">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="quick-search">
        <div className="container">
          <div className="search-card">
            <h3>Quick Car Search</h3>
            <div className="search-form">
              <div className="form-group">
                <label>Pick-up Location</label>
                <input type="text" placeholder="Enter city or airport" className="form-input" />
              </div>
              <div className="form-group">
                <label>Pick-up Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Return Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Car Type</label>
                <select className="form-select">
                  <option value="">All Types</option>
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <Link to="/cars" className="btn btn-primary search-btn">Search Cars</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars */}
      <section className="popular-cars">
        <div className="container">
          <h2 className="text-center mb-4">Popular Cars</h2>
          <div className="grid grid-3">
            {popularCars.map((car) => (
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
                  <p className="car-type">{car.type}</p>
                  <div className="car-footer">
                    <div className="car-price">
                      <span className="price">${car.price}</span>
                      <span className="period">/day</span>
                    </div>
                    <Link to={`/cars/${car.id}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/cars" className="btn btn-outline">View All Cars</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Hit the Road?</h2>
            <p>Join thousands of satisfied customers and book your car today!</p>
            <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
