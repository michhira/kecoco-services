import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = ({ translations }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate registration - replace with actual API call
      setTimeout(() => {
        setErrors({ general: 'Registration system in development' });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setErrors({ general: translations.error + ': ' + 'Registration failed' });
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>{translations.createAccount}</h1>
          <p>{translations.joinToday}</p>
        </div>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">{translations.fullName} *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
              placeholder={translations.fullName}
              required
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{translations.email} *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder={translations.email}
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{translations.phoneNumber} *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+250 XXX XXX XXX"
              required
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{translations.password} *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder={translations.password}
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{translations.confirmPassword} *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder={translations.confirmPassword}
              required
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? translations.creatingAccount : translations.createAccountBtn}
          </button>
        </form>

        <div className="register-footer">
          <p>
            {translations.alreadyHaveAccount}{' '}
            <Link to="/login" className="link">
              {translations.signInHere}
            </Link>
          </p>
        </div>

        <div className="back-home">
          <Link to="/" className="btn-secondary">
            ← {translations.backToSite}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;