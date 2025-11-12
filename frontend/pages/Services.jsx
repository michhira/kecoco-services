const Services = ({ translations }) => {
  const navigate = useNavigate();

  const handleServiceRequest = (serviceName, servicePrice) => {
    // Store selected service in localStorage
    localStorage.setItem('selectedService', JSON.stringify({
      name: serviceName,
      price: servicePrice
    }));
    
    // Navigate to request form
    navigate('/request');
  };

  const handleCustomRequest = () => {
    localStorage.setItem('selectedService', JSON.stringify({
      name: 'Custom Service',
      price: 'Contact for Quote'
    }));
    navigate('/request');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.services}
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.lightText,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {translations.comprehensiveSolutions}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            {
              name: "Irembo Services",
              description: "All government services through Irembo platform including document processing, license applications, and public service registration",
              price: "5,000",
              duration: "1-2 days",
              features: ["Document Processing", "License Applications", "Public Service Registration"]
            },
            {
              name: "Tax Payment",
              description: "Business and personal tax payment assistance with tax consulting and clearance certificates",
              price: "10,000", 
              duration: "1 day",
              features: ["Tax Consulting", "Clearance Certificates", "Financial Advice"]
            },
            {
              name: "Construction Services",
              description: "Complete construction solutions including house construction, building materials, and project management",
              price: "Contact for Quote",
              duration: "Varies",
              features: ["Project Management", "Architectural Design", "Construction Supervision"]
            },
            {
              name: "Land Services", 
              description: "Land registration, plot surveying, ownership transfer and land documentation services",
              price: "15,000",
              duration: "3-5 days",
              features: ["Title Registration", "Land Surveying", "Ownership Transfer"]
            }
          ].map((service, index) => (
            <div key={index} style={{ 
              background: 'white',
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${colors.accent}20`,
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                {service.name}
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                color: colors.lightText,
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {service.description}
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}>
                    <span style={{ 
                      color: colors.secondary, 
                      marginRight: '0.5rem',
                      fontWeight: 'bold'
                    }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: `${colors.primary}10`,
                borderRadius: '8px'
              }}>
                <div>
                  <strong style={{ color: colors.primary }}>Price:</strong> RWF {service.price}
                </div>
                <div>
                  <strong style={{ color: colors.primary }}>Duration:</strong> {service.duration}
                </div>
              </div>
              
              <button 
                onClick={() => handleServiceRequest(service.name, service.price)}
                style={{ 
                  background: colors.secondary,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  width: '100%',
                  transition: 'background 0.3s, transform 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = colors.secondary;
                  e.target.style.transform = 'translateY(0)';
                }}>
                Request This Service
              </button>
            </div>
          ))}
        </div>

        {/* Custom Solution Section */}
        <div style={{ 
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          marginTop: '4rem',
          border: `2px solid ${colors.accent}`
        }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.needCustomSolution}
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: colors.lightText,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {translations.contactForPackages}
          </p>
          <button 
            onClick={handleCustomRequest}
            style={{ 
              background: colors.accent,
              color: 'white', 
              border: 'none', 
              padding: '1.2rem 2.5rem', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: '600',
              transition: 'background 0.3s, transform 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#2563eb';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = colors.accent;
              e.target.style.transform = 'translateY(0)';
            }}>
            {translations.customRequest}
          </button>
        </div>
      </div>
    </div>
  );
};