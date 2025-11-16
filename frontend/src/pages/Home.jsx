import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaHandshake, 
  FaStar, 
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaFileAlt,
  FaMoneyBillWave,
  FaHardHat,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Home = ({ translations }) => {
  const navigate = useNavigate();

  const colors = {
    primary: '#1e3a8a',     // Blue - for header
    secondary: '#dc2626',   // Red - for all buttons
    accent: '#dc2626',      // Red - for accents
    background: '#ffffff',  // White - for all backgrounds
    text: '#1f2937',        // Dark Gray - for text
    lightText: '#6b7280'    // Light Gray - for secondary text
  };

  // Services preview
  const featuredServices = [
    {
      icon: <FaFileAlt />,
      title: translations?.governmentServices || "Government Services",
      description: translations?.governmentDesc || "Complete government services through Irembo platform",
      price: "5,000 RWF",
      color: colors.secondary
    },
    {
      icon: <FaMoneyBillWave />,
      title: translations?.financialServices || "Financial Services", 
      description: translations?.financialDesc || "Tax payment and financial consulting",
      price: "10,000 RWF",
      color: colors.secondary
    },
    {
      icon: <FaHardHat />,
      title: translations?.constructionServices || "Construction Services",
      description: translations?.constructionDesc || "Building and construction solutions",
      price: translations?.contactForQuote || "Contact for Quote",
      color: colors.secondary
    },
    {
      icon: <FaMapMarkerAlt />,
      title: translations?.landServices || "Land Services",
      description: translations?.landDesc || "Land registration and documentation",
      price: "15,000 RWF", 
      color: colors.secondary
    }
  ];

  // Why choose us features
  const features = [
    {
      icon: <FaShieldAlt />,
      title: translations?.trusted || "Trusted & Reliable",
      description: translations?.trustedDesc || "Certified and authorized service provider"
    },
    {
      icon: <FaClock />,
      title: translations?.fast || "Fast Processing", 
      description: translations?.fastDesc || "Quick and efficient service delivery"
    },
    {
      icon: <FaCheckCircle />,
      title: translations?.quality || "Quality Guaranteed",
      description: translations?.qualityDesc || "High quality standards maintained"
    },
    {
      icon: <FaUsers />,
      title: translations?.expert || "Expert Team",
      description: translations?.expertDesc || "Experienced professionals"
    }
  ];

  // Quick stats
  const stats = [
    { number: '500+', label: translations?.happyClients || 'Happy Clients' },
    { number: '1000+', label: translations?.servicesDelivered || 'Services Delivered' },
    { number: '24/7', label: translations?.customerSupport || 'Customer Support' },
    { number: '98%', label: translations?.satisfactionRate || 'Satisfaction Rate' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Hero Section - White Background */}
      <section style={{
        background: '#ffffff',
        padding: '5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: colors.primary,
            lineHeight: '1.2'
          }}>
            {translations.welcome || "Welcome to K.E COCO Services"}
          </h1>
          <p style={{ 
            fontSize: '1.4rem',
            marginBottom: '2.5rem',
            color: colors.lightText,
            lineHeight: '1.6'
          }}>
            {translations.slogan || "Your trusted partner for government and business services in Rwanda"}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/services')}
              style={{
                background: colors.secondary,
                color: 'white',
                border: 'none',
                padding: '1.2rem 2.5rem',
                fontSize: '1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.secondary;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaRocket />
              {translations.viewServices || "View Our Services"}
            </button>
            <button 
              onClick={() => navigate('/contact')}
              style={{
                background: colors.secondary,
                color: 'white',
                border: 'none',
                padding: '1.2rem 2.5rem',
                fontSize: '1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.secondary;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaPhone />
              {translations.contactUs || "Contact Us"}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Services - White Background */}
      <section style={{ padding: '5rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem',
              color: colors.primary,
              marginBottom: '1rem'
            }}>
              {translations.ourServices || "Our Services"}
            </h2>
            <p style={{ 
              fontSize: '1.3rem',
              color: colors.lightText
            }}>
              {translations.comprehensiveSolutions || "Comprehensive solutions for all your service needs"}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {featuredServices.map((service, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2.5rem 2rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/services')}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = service.color;
                  e.currentTarget.style.boxShadow = '0 8px 25px #fff(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  color: service.color,
                  marginBottom: '1.5rem'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: colors.text,
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: colors.lightText,
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  {service.description}
                </p>
                <div style={{
                  background: '#f8fafc',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  color: service.color,
                  fontSize: '1.1rem'
                }}>
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Light Gray Background */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem',
              color: colors.primary,
              marginBottom: '1rem'
            }}>
              {translations.whyChooseUs || "Why Choose K.E COCO?"}
            </h2>
            <p style={{ 
              fontSize: '1.3rem',
              color: colors.lightText
            }}>
              {translations.whyChooseDesc || "We stand out with our commitment to excellence and customer satisfaction"}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: '#ffffff',
                padding: '2.5rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  fontSize: '3rem',
                  color: colors.secondary,
                  marginBottom: '1.5rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: colors.text,
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: colors.lightText,
                  lineHeight: '1.5',
                  fontSize: '1.1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - White Background */}
      <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                color: colors.secondary,
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{ 
                fontSize: '1.2rem',
                color: colors.lightText,
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Red Background */}
      <section style={{
        background: colors.secondary,
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.8rem',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            {translations.readyToStart || "Ready to Get Started?"}
          </h2>
          <p style={{ 
            fontSize: '1.3rem',
            marginBottom: '2.5rem',
            opacity: 0.9
          }}>
            {translations.readyDesc || "Contact us today and experience professional service like never before"}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/request')}
              style={{
                background: '#ffffff',
                color: colors.secondary,
                border: 'none',
                padding: '1.2rem 2.5rem',
                fontSize: '1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f1f5f9';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaFileAlt />
              {translations.requestService || "Request Service"}
            </button>
            <button 
              onClick={() => navigate('/contact')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1.2rem 2.5rem',
                fontSize: '1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = colors.secondary;
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              <FaEnvelope />
              {translations.contactUs || "Contact Us"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;