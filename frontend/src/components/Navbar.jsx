import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../navbar.css';

const Navbar = ({ translations, toggleLanguage, currentLanguage }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">🏢</div>
            <div className="brand-text">
              <h2>K.E COCO</h2>
              <span>Services</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {translations.home}
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            {translations.services}
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            {translations.contact}
          </Link>
          <Link 
            to="/request" 
            className={`nav-link ${location.pathname === '/request' ? 'active' : ''}`}
          >
            {translations.request}
          </Link>
          <Link 
            to="/admin/login" 
            className={`nav-link admin-link ${location.pathname.includes('/admin') ? 'active' : ''}`}
          >
            {translations.admin}
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="nav-actions">
          <button onClick={toggleLanguage} className="language-btn">
            {currentLanguage === 'en' ? 'Kinyarwanda' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;