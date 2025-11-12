const RequestForm = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Auto-fill service from localStorage
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      const service = JSON.parse(selectedService);
      setFormData(prev => ({
        ...prev,
        service: service.name,
        description: `I would like to request: ${service.name}`
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show success message
    alert(`✅ Service request submitted successfully!\n\nWe have received your request for "${formData.service}" and will contact you at ${formData.phone} within 24 hours.`);
    
    // Clear localStorage
    localStorage.removeItem('selectedService');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      description: ''
    });
    
    // Navigate to home page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.requestOurServices}
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.lightText,
            lineHeight: '1.6'
          }}>
            {translations.fillForm}
          </p>
        </div>
        
        <div style={{ 
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Personal Information */}
            <div>
              <h2 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,
                marginBottom: '1.5rem',
                fontWeight: '600',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${colors.accent}`
              }}>
                {translations.personalInformation}
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.text,
                    fontSize: '1.1rem'
                  }}>
                    {translations.fullName} *
                  </label>
                  <input 
                    type="text" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.text,
                    fontSize: '1.1rem'
                  }}>
                    {translations.email} *
                  </label>
                  <input 
                    type="email" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.text,
                    fontSize: '1.1rem'
                  }}>
                    {translations.phoneNumber} *
                  </label>
                  <input 
                    type="tel" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h2 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,
                marginBottom: '1.5rem',
                fontWeight: '600',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${colors.accent}`
              }}>
                {translations.serviceDetails}
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: colors.text,
                  fontSize: '1.1rem'
                }}>
                  {translations.serviceType} *
                </label>
                <select 
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  required
                >
                  <option value="">{translations.selectService}</option>
                  <option value="Irembo Services">Irembo Services - RWF 5,000</option>
                  <option value="Tax Payment">Tax Payment - RWF 10,000</option>
                  <option value="Construction Services">Construction Services - Contact for Quote</option>
                  <option value="Land Services">Land Services - RWF 15,000</option>
                  <option value="Custom Service">Custom Service - Contact for Quote</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: colors.text,
                  fontSize: '1.1rem'
                }}>
                  {translations.serviceDescription} *
                </label>
                <textarea 
                  rows="6"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Please describe your service requirements in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              <button 
                type="button"
                onClick={handleBackToServices}
                style={{ 
                  background: colors.lightText,
                  color: 'white', 
                  border: 'none', 
                  padding: '1.2rem 2rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#4b5563'}
                onMouseOut={(e) => e.target.style.background = colors.lightText}>
                ← Back to Services
              </button>
              
              <button type="submit" style={{ 
                background: colors.secondary,
                color: 'white', 
                border: 'none', 
                padding: '1.2rem 2rem', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: '600',
                transition: 'background 0.3s, transform 0.3s',
                flex: 1
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.secondary;
                e.target.style.transform = 'translateY(0)';
              }}>
                {translations.submitRequest}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};