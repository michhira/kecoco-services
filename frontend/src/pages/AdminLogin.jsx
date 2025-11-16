import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = ({ translations }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const colors = {
    primary: '#1e3a8a',
    secondary: '#dc2626',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937',
    lightText: '#6b7280'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple authentication (in real app, this would be API call)
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('kecoco_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(translations?.invalidCredentials || 'Invalid username or password');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        border: `1px solid #e2e8f0`
      }}>
        {/* Security Badge */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: colors.secondary,
          color: 'white',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaUserShield />
          {translations.adminAccess}
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '3rem',
            color: colors.primary,
            marginBottom: '1rem'
          }}>
            <FaUserShield />
          </div>
          <h1 style={{ 
            fontSize: '2rem',
            color: colors.text,
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            {translations.adminSignIn}
          </h1>
          <p style={{ 
            color: colors.lightText,
            fontSize: '1rem'
          }}>
            {translations.restrictedArea}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: colors.text,
              fontSize: '0.9rem'
            }}>
              {translations.enterUsername}
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  border: `2px solid #e2e8f0`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
                placeholder="admin"
                required
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <FaUserShield style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.lightText
              }} />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: colors.text,
              fontSize: '0.9rem'
            }}>
              {translations.enterPassword}
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '1rem 3rem 1rem 3rem', 
                  border: `2px solid #e2e8f0`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
                placeholder="••••••••"
                required
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <FaLock style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.lightText
              }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: colors.lightText,
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            style={{
              background: colors.primary,
              color: 'white',
              border: 'none',
              padding: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => {
              e.target.style.background = colors.accent;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FaUserShield />
            {translations.adminSignIn}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: `1px solid ${colors.accent}20`,
          fontSize: '0.8rem',
          color: colors.lightText,
          textAlign: 'center'
        }}>
          <strong>Demo Credentials:</strong><br />
          Username: admin<br />
          Password: admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;