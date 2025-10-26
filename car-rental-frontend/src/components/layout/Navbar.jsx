import React from 'react';
import { Link } from 'react-router-dom';
import { Car, User, Menu, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <Car size={28} />
            <span>CarRental</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/cars" className="nav-link">Cars</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="nav-link">
                  <User size={18} />
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="nav-link">Admin</Link>
                )}
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/cars" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Cars
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
