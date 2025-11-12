import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setMessage(translations.success + '! ' + 'We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setMessage(translations.error + ': ' + 'Error sending message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>{translations.contact}</h1>
          <p>{translations.getInTouch}</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>{translations.ourOffice}</h2>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>{translations.location}</h3>
                  <p>Kigali, Rwanda</p>
                  <p>{translations.cityCenter}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>{translations.phoneNumbers}</h3>
                  <p>+250 788 123 456</p>
                  <p>+250 789 987 654</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>{translations.emailAddress}</h3>
                  <p>info@kecoco.rw</p>
                  <p>support@kecoco.rw</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h3>{translations.businessHours}</h3>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="social-links">
                <h3>{translations.followUs}</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">📘 Facebook</a>
                  <a href="#" className="social-icon">📷 Instagram</a>
                  <a href="#" className="social-icon">🐦 Twitter</a>
                  <a href="#" className="social-icon">💼 LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>{translations.sendMessage}</h2>
              {message && (
                <div className={`message-alert ${message.includes('Error') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{translations.fullName} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={translations.fullName}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{translations.phoneNumber} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{translations.email} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>{translations.subject} *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={translations.subject}
                  />
                </div>

                <div className="form-group">
                  <label>{translations.message} *</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={translations.message}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? translations.submitting + '...' : translations.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="container">
          <h2>{translations.findUs}</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">🗺️</div>
              <h3>{translations.kigaliLocation}</h3>
              <p>{translations.cityCenter}</p>
              <p>{translations.easyAccess}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;