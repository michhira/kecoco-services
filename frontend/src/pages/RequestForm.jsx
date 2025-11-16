import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUser, FaArrowRight, FaRocket } from 'react-icons/fa';

const RequestForm = ({ translations, currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: ''
  });

  const navigate = useNavigate();

  const colors = {
    primary: '#1e3a8a',     // Blue - for header
    secondary: '#dc2626',   // Red - for all buttons
    accent: '#dc2626',      // Red - for accents
    background: '#ffffff',  // White - for all backgrounds
    text: '#ffffff',        // WHITE - for text (changed from black)
    lightText: '#f3f4f6'    // Light Gray - for secondary text
  };

  const servicesData = {
    en: {
      government: { title: "Government Services", price: "5,000 RWF" },
      financial: { title: "Financial Services", price: "10,000 RWF" },
      construction: { title: "Construction Services", price: "Contact for Quote" },
      land: { title: "Land Services", price: "15,000 RWF" }
    },
    rw: {
      government: { title: "Serivisi z'Igihugu", price: "RWF 5,000" },
      financial: { title: "Serivisi z'Imari", price: "RWF 10,000" },
      construction: { title: "Serivisi zo Kubaka", price: "Twandikire Tubwire" },
      land: { title: "Serivisi z'Ubutaka", price: "RWF 15,000" }
    }
  };

  useEffect(() => {
    const selectedService = localStorage.getItem('kecoco_selected_service');
    if (selectedService && servicesData[currentLanguage] && servicesData[currentLanguage][selectedService]) {
      const service = servicesData[currentLanguage][selectedService];
      setFormData(prev => ({
        ...prev,
        service: service.title,
        description: `I would like to request: ${service.title}\n\nAdditional details: `
      }));
    }
  }, [currentLanguage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requests = JSON.parse(localStorage.getItem('kecoco_service_requests') || '[]');
    const newRequest = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      language: currentLanguage
    };
    
    requests.push(newRequest);
    localStorage.setItem('kecoco_service_requests', JSON.stringify(requests));
    
    alert(`✅ Service request submitted successfully!\n\nWe have received your request for "${formData.service}" and will contact you at ${formData.phone} within 24 hours.`);
    
    localStorage.removeItem('kecoco_selected_service');
    setFormData({ name: '', email: '', phone: '', service: '', description: '' });
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', color: colors.primary, marginBottom: '1rem' }}>
            <FaFileAlt style={{ fontSize: '4rem' }} />
          </div>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,  // Blue for header
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.requestOurServices}
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.primary,  // Blue for subheader
            lineHeight: '1.6'
          }}>
            {translations.fillForm}
          </p>
        </div>
        
        <div style={{ 
          background: '#f8fafc',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Personal Information */}
            <div>
              <h2 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,  // Blue for headers
                marginBottom: '1.5rem',
                fontWeight: '600',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${colors.secondary}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}>
                <FaUser />
                {translations.personalInformation}
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary,  // Blue for labels
                    fontSize: '1.1rem'
                  }}>
                    {translations.fullName} *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid #e2e8f0`,
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary,  // Blue for labels
                    fontSize: '1.1rem'
                  }}>
                    {translations.email} *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid #e2e8f0`,
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary,  // Blue for labels
                    fontSize: '1.1rem'
                  }}>
                    {translations.phoneNumber} *
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid #e2e8f0`,
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h2 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,  // Blue for headers
                marginBottom: '1.5rem',
                fontWeight: '600',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${colors.secondary}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}>
                <FaFileAlt />
                {translations.serviceDetails}
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: colors.primary,  // Blue for labels
                  fontSize: '1.1rem'
                }}>
                  {translations.serviceType} *
                </label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid #e2e8f0`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    color: '#1f2937',  // Dark gray for select text
                    background: 'white'
                  }}
                  required
                >
                  <option value="">{translations.selectService}</option>
                  {Object.entries(servicesData[currentLanguage]).map(([key, service]) => (
                    <option key={key} value={service.title}>
                      {service.title} - {service.price}
                    </option>
                  ))}
                  <option value="Custom Service">Custom Service - Contact for Quote</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: colors.primary,  // Blue for labels
                  fontSize: '1.1rem'
                }}>
                  {translations.serviceDescription} *
                </label>
                <textarea 
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid #e2e8f0`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    resize: 'vertical',
                    color: '#1f2937',  // Dark gray for textarea text
                    background: 'white'
                  }}
                  placeholder="Please describe your service requirements in detail..."
                  required
                ></textarea>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              <button 
                type="button"
                onClick={handleBackToServices}
                style={{ 
                  background: '#6b7280',
                  color: 'white', 
                  border: 'none', 
                  padding: '1.2rem 2rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  transition: 'background 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => e.target.style.background = '#4b5563'}
                onMouseOut={(e) => e.target.style.background = '#6b7280'}>
                <FaArrowRight style={{ transform: 'rotate(180deg)' }} />
                Back to Services
              </button>
              
              <button type="submit" style={{ 
                background: colors.secondary,  // Red button
                color: 'white', 
                border: 'none', 
                padding: '1.2rem 2rem', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: '600',
                transition: 'background 0.3s, transform 0.3s',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.secondary;
                e.target.style.transform = 'translateY(0)';
              }}>
                <FaRocket />
                {translations.submitRequest}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;