import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ translations }) => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>K.E COCO Services</h1>
          <h2>{translations.welcome}</h2>
          <p>{translations.slogan}</p>
          <div className="hero-buttons">
            <Link to="/services">
              <button className="btn-primary">{translations.getStarted}</button>
            </Link>
            <Link to="/contact">
              <button className="btn-secondary">{translations.contact}</button>
            </Link>
            <Link to="/login">
              <button className="btn-outline">{translations.login}</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2>{translations.ourServices}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏛️</div>
              <h3>Irembo Services</h3>
              <p>All government services through Irembo platform</p>
              <Link to="/services">
                <button className="btn-primary">{translations.learnMore}</button>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>{translations.taxPayment}</h3>
              <p>Business and personal tax payment assistance</p>
              <Link to="/services">
                <button className="btn-primary">{translations.learnMore}</button>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>{translations.construction}</h3>
              <p>House construction and building materials</p>
              <Link to="/services">
                <button className="btn-primary">{translations.learnMore}</button>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">📐</div>
              <h3>{translations.landServices}</h3>
              <p>Land registration and plot surveying</p>
              <Link to="/services">
                <button className="btn-primary">{translations.learnMore}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>{translations.whyChooseUs}</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <h3>{translations.fastService}</h3>
              <p>{translations.fastServiceDesc}</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💼</div>
              <h3>{translations.professional}</h3>
              <p>{translations.professionalDesc}</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>{translations.affordable}</h3>
              <p>{translations.affordableDesc}</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📞</div>
              <h3>{translations.support}</h3>
              <p>{translations.supportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>{translations.readyToStart}</h2>
          <p>{translations.joinCustomers}</p>
          <div className="cta-buttons">
            <Link to="/request">
              <button className="btn-primary">{translations.request}</button>
            </Link>
            <Link to="/contact">
              <button className="btn-secondary">{translations.contact}</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;