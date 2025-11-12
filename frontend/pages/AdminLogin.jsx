import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ translations }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: Real admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'kecoco2024'
  };

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
    setErrors({});

    try {
      // ✅ FIXED: Simple validation logic
      if (formData.username === ADMIN_CREDENTIALS.username && 
          formData.password === ADMIN_CREDENTIALS.password) {
        
        // ✅ FIXED: Store admin data in localStorage
        const adminData = {
          username: formData.username,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('admin', JSON.stringify(adminData));
        localStorage.setItem('adminToken', 'admin-authenticated');
        
        // ✅ FIXED: Redirect to dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
        
      } else {
        // ❌ Invalid credentials
        setErrors({ 
          general: 'Invalid username or password. Please try again.' 
        });
        setIsLoading(false);
      }
      
    } catch (error) {
      setErrors({ 
        general: 'Login failed. Please try again.' 
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>🔐 {translations.adminAccess}</h1>
          <p>{translations.restrictedArea}</p>
        </div>

        {/* ✅ FIXED: Show default credentials for testing */}
        <div className="admin-credentials-info">
          <h3>📋 {translations.defaultCredentials}:</h3>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> kecoco2024</p>
        </div>

        {errors.general && (
          <div className="error-message">
            ❌ {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">{translations.username} *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder={translations.enterUsername}
              required
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
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
              placeholder={translations.enterPassword}
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                {translations.signingIn}
              </>
            ) : (
              translations.adminSignIn
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <button 
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            ← {translations.backToSite}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;