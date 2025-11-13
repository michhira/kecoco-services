import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
// COLOR THEME: BLUE, WHITE, RED
const colors = {
  primary: '#1e3a8a',     // Dark Blue
  secondary: '#dc2626',   // Red
  accent: '#3b82f6',      // Light Blue
  background: '#ffffff',  // White
  text: '#1f2937',        // Dark Gray
  lightText: '#6b7280'    // Light Gray
};

// STORAGE KEYS
const STORAGE_KEYS = {
  MESSAGES: 'kecoco_messages',
  REQUESTS: 'kecoco_service_requests',
  SELECTED_SERVICE: 'kecoco_selected_service'
};

// SERVICE DATA
const servicesData = {
  en: {
    government: {
      title: "Government Services",
      description: "Complete government service solutions through Irembo platform",
      fullDescription: "We provide comprehensive government services through the Irembo platform. Our experienced team handles all your documentation needs efficiently and professionally.",
      features: [
        "Document Processing & Verification",
        "License Applications & Renewals", 
        "Public Service Registration",
        "Certificate Issuance",
        "ID & Passport Services",
        "Business Registration"
      ],
      process: ["Submit Documents", "We Process", "You Receive"],
      price: "5,000 RWF",
      duration: "1-2 business days"
    },
    financial: {
      title: "Financial Services", 
      description: "Tax payment and financial consulting services",
      fullDescription: "Our financial experts help you with all tax-related matters and financial consulting. We ensure compliance and optimize your financial operations.",
      features: [
        "Business & Personal Tax Payment",
        "Tax Consulting & Planning",
        "Clearance Certificates",
        "Financial Advisory",
        "Tax Compliance Checks",
        "Revenue Authority Liaison"
      ],
      process: ["Consultation", "Document Preparation", "Payment Processing"],
      price: "10,000 RWF", 
      duration: "1 business day"
    },
    construction: {
      title: "Construction Services",
      description: "Complete construction and building solutions",
      fullDescription: "From planning to completion, we handle all your construction needs. We provide quality materials and professional project management.",
      features: [
        "House Construction & Renovation",
        "Building Materials Supply",
        "Project Management",
        "Architectural Design",
        "Construction Supervision", 
        "Quality Assurance"
      ],
      process: ["Consultation", "Planning & Design", "Construction", "Handover"],
      price: "Contact for Quote",
      duration: "Varies by project"
    },
    land: {
      title: "Land Services",
      description: "Land registration and documentation services",
      fullDescription: "We specialize in land-related services including registration, surveying, and ownership transfers. Our experts ensure smooth processing of all land documents.",
      features: [
        "Land Title Registration",
        "Plot Surveying & Mapping",
        "Ownership Transfer",
        "Land Documentation",
        "Boundary Marking",
        "Land Dispute Resolution"
      ],
      process: ["Document Review", "Survey & Verification", "Registration"],
      price: "15,000 RWF",
      duration: "3-5 business days"
    }
  },
  rw: {
    government: {
      title: "Serivisi z'Igihugu",
      description: "Serivisi z'igihugu zuzuye muri platform ya Irembo",
      fullDescription: "Duhanga serivisi z'igihugu zuzuye muri platform ya Irembo. Itsinda ryacu rihugije rigenzura ibyanyu byose mu buryo bwihuse kandi bwiza.",
      features: [
        "Gutunganya no gusuzuma inyandiko",
        "Gusaba no kongera amasaha icyangombwa",
        "Kwiyandikisha mu serivisi z'igihugu",
        "Gutanga icyemezo",
        "Serivisi z'indangamuntu na pasiporo",
        "Kwiyandikisha ubucuruzi"
      ],
      process: ["Ohereza Inyandiko", "Tuzagenzura", "Uzakira"],
      price: "RWF 5,000",
      duration: "Iminsi 1-2 y'akazi"
    },
    financial: {
      title: "Serivisi z'Imari",
      description: "Gushora amafaranga no kugisha inama ku by'imari",
      fullDescription: "Abahanga mu by'imari bagufasha mu byose biherereye ku mashora. Dushishikariza kuzuza ibisabwa no kwegereza neza imikorere yawe y'imari.",
      features: [
        "Gushora amafaranga y'ubucuruzi n'umuntu",
        "Kugisha inama no gucunga amashora",
        "Icyemezo cy'ubuziranenge",
        "Inama z'imari",
        "Gusuzuma kuzuza amashora",
        "Ubudatabane n'ishami ry'amashora"
      ],
      process: ["Inama", "Gutegura Inyandiko", "Gutunganya Ishora"],
      price: "RWF 10,000",
      duration: "Umunsi umwe w'akazi"
    },
    construction: {
      title: "Serivisi zo Kubaka",
      description: "Ibisubizo byuzuye byo kubaka no gutera",
      fullDescription: "Kuva mu gahunda kugeza kurangiza, dufata byose ukeneye mu kubaka. Dutanga ibikoresho byiza n'ubucurizi bwiza bw'umushinga.",
      features: [
        "Kubaka no kwegura inzu",
        "Gutanga ibikoresho byo kubaka",
        "Gucunga umushinga",
        "Gushushanya imiterere",
        "Gucunga ubukorikori",
        "Gushishikariza irembere"
      ],
      process: ["Inama", "Gahunda no Gushushanya", "Kubaka", "Kohereza"],
      price: "Twandikire Tubwire igiciro",
      duration: "Bihindagurika bitewe n'umushinga"
    },
    land: {
      title: "Serivisi z'Ubutaka",
      description: "Serivisi zo kwiyandikisha ubutaka no gutunganya inyandiko",
      fullDescription: "Twarabikoze mu serivisi zihuza ubutaka harimo kwiyandikisha, gupima, no kwegurira ubwenegihugu. Abahanga bacu basigasira gutunganya neza inyandiko zose z'ubutaka.",
      features: [
        "Kwiyandikisha indangamuntu y'ubutaka",
        "Gupima no gushushanya ikimetero",
        "Kwegurira ubwenegihugu",
        "Inyandiko z'ubutaka",
        "Gushyiraho umupaka",
        "Gukemura impaka z'ubutaka"
      ],
      process: ["Gusuzuma Inyandiko", "Gupima no Gusuzuma", "Kwiyandikisha"],
      price: "RWF 15,000",
      duration: "Iminsi 3-5 y'akazi"
    }
  }
};

// STYLED NAVBAR COMPONENT
const Navbar = ({ translations, toggleLanguage, currentLanguage }) => {
  const navigate = useNavigate();
  
  return (
    <nav style={{ 
      background: colors.primary,
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '1.1rem'
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span style={{ 
          fontWeight: 'bold', 
          fontSize: '1.5rem',
          color: 'white',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}>
          K.E COCO SERVICES
        </span>
        <a href="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = colors.accent}
        onMouseOut={(e) => e.target.style.background = 'transparent'}>
          {translations.home}
        </a>
        <a href="/services" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = colors.accent}
        onMouseOut={(e) => e.target.style.background = 'transparent'}>
          {translations.services}
        </a>
        <a href="/contact" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = colors.accent}
        onMouseOut={(e) => e.target.style.background = 'transparent'}>
          {translations.contact}
        </a>
        <a href="/request" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = colors.accent}
        onMouseOut={(e) => e.target.style.background = 'transparent'}>
          {translations.request}
        </a>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="/admin/login" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = colors.accent}
        onMouseOut={(e) => e.target.style.background = 'transparent'}>
          {translations.admin}
        </a>
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: colors.secondary,
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = colors.secondary}
        >
          {currentLanguage === 'en' ? 'Kinyarwanda' : 'English'}
        </button>
      </div>
    </nav>
  );
};

// LARGE HOME PAGE
const Home = ({ translations, currentLanguage }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/services');
  };

  const handleLearnMore = () => {
    navigate('/services');
  };

  const handleServiceLearnMore = (serviceKey) => {
    navigate(`/service/${serviceKey}`);
  };

  const handleServiceStart = (serviceKey) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SERVICE, serviceKey);
    navigate('/request');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Hero Section */}
      <section style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {translations.welcome}
        </h1>
        <p style={{ 
          fontSize: '1.8rem', 
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.6'
        }}>
          {translations.slogan}
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleGetStarted}
            style={{ 
              background: colors.secondary,
              color: 'white', 
              border: 'none', 
              padding: '1.2rem 2.5rem', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.3rem',
              fontWeight: '600',
              transition: 'transform 0.3s, background 0.3s',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#b91c1c';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = colors.secondary;
              e.target.style.transform = 'translateY(0)';
            }}>
            {translations.getStarted}
          </button>
          <button 
            onClick={handleLearnMore}
            style={{ 
              background: 'transparent', 
              color: 'white', 
              border: '3px solid white', 
              padding: '1.2rem 2.5rem', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.3rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = colors.primary;
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}>
            {translations.learnMore}
          </button>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ padding: '5rem 2rem', background: colors.background }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.8rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.ourServices}
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.4rem', 
            color: colors.lightText,
            marginBottom: '4rem'
          }}>
            {translations.comprehensiveSolutions}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {Object.entries(servicesData[currentLanguage]).map(([key, service]) => (
              <div 
                key={key}
                style={{ 
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  border: `2px solid ${colors.accent}20`,
                  textAlign: 'center',
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{getServiceIcon(key)}</div>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  color: colors.primary,
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: colors.lightText,
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => handleServiceLearnMore(key)}
                    style={{ 
                      background: colors.accent,
                      color: 'white', 
                      border: 'none', 
                      padding: '0.8rem 1.5rem', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem',
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
                    Learn More
                  </button>
                  <button 
                    onClick={() => handleServiceStart(key)}
                    style={{ 
                      background: colors.secondary,
                      color: 'white', 
                      border: 'none', 
                      padding: '0.8rem 1.5rem', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
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
                    Start Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// SERVICE DETAIL PAGE
const ServiceDetail = ({ translations, currentLanguage }) => {
  const navigate = useNavigate();
  const [serviceKey, setServiceKey] = useState(null);
  const [service, setService] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const key = path.split('/').pop();
    setServiceKey(key);
    
    if (servicesData[currentLanguage] && servicesData[currentLanguage][key]) {
      setService(servicesData[currentLanguage][key]);
    }
  }, [currentLanguage]);

  const handleStartService = () => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SERVICE, serviceKey);
    navigate('/request');
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: colors.primary }}>Service Not Found</h1>
        <button onClick={handleBackToServices} style={{ 
          background: colors.accent, 
          color: 'white', 
          padding: '1rem 2rem', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '2rem'
        }}>
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{getServiceIcon(serviceKey)}</div>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {service.title}
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.lightText,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {service.description}
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: colors.primary,
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            Service Overview
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: colors.text,
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            {service.fullDescription}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: colors.primary, marginBottom: '1rem' }}>What We Offer:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {service.features.map((feature, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1rem',
                  background: `${colors.primary}05`,
                  borderRadius: '8px'
                }}>
                  <span style={{ color: colors.secondary, marginRight: '0.5rem', fontWeight: 'bold' }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: colors.primary, marginBottom: '1rem' }}>Our Process:</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              {service.process.map((step, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
                  <div style={{ 
                    background: colors.accent,
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem auto',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: colors.text }}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Duration */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            background: `${colors.primary}10`,
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', color: colors.lightText, marginBottom: '0.5rem' }}>Price</div>
              <div style={{ fontSize: '1.5rem', color: colors.primary, fontWeight: 'bold' }}>{service.price}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', color: colors.lightText, marginBottom: '0.5rem' }}>Duration</div>
              <div style={{ fontSize: '1.5rem', color: colors.primary, fontWeight: 'bold' }}>{service.duration}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleBackToServices}
              style={{ 
                background: colors.lightText,
                color: 'white', 
                border: 'none', 
                padding: '1rem 2rem', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#4b5563'}
              onMouseOut={(e) => e.target.style.background = colors.lightText}>
              ← Back to Services
            </button>
            <button 
              onClick={handleStartService}
              style={{ 
                background: colors.secondary,
                color: 'white', 
                border: 'none', 
                padding: '1rem 2rem', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
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
              Start This Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// SERVICES PAGE
const Services = ({ translations, currentLanguage }) => {
  const navigate = useNavigate();

  const handleLearnMore = (serviceKey) => {
    navigate(`/service/${serviceKey}`);
  };

  const handleStartService = (serviceKey) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SERVICE, serviceKey);
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
          {Object.entries(servicesData[currentLanguage]).map(([key, service]) => (
            <div key={key} style={{ 
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>{getServiceIcon(key)}</div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                color: colors.primary,
                marginBottom: '1rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {service.title}
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                color: colors.lightText,
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {service.description}
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {service.features.slice(0, 3).map((feature, idx) => (
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
                {service.features.length > 3 && (
                  <div style={{ color: colors.accent, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    + {service.features.length - 3} more features
                  </div>
                )}
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
                  <strong style={{ color: colors.primary }}>Price:</strong> {service.price}
                </div>
                <div>
                  <strong style={{ color: colors.primary }}>Duration:</strong> {service.duration}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                <button 
                  onClick={() => handleLearnMore(key)}
                  style={{ 
                    background: colors.accent,
                    color: 'white', 
                    border: 'none', 
                    padding: '0.8rem 1.5rem', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background 0.3s',
                    flex: 1
                  }}
                  onMouseOver={(e) => e.target.style.background = '#2563eb'}
                  onMouseOut={(e) => e.target.style.background = colors.accent}>
                  Learn More
                </button>
                <button 
                  onClick={() => handleStartService(key)}
                  style={{ 
                    background: colors.secondary,
                    color: 'white', 
                    border: 'none', 
                    padding: '0.8rem 1.5rem', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background 0.3s',
                    flex: 1
                  }}
                  onMouseOver={(e) => e.target.style.background = '#b91c1c'}
                  onMouseOut={(e) => e.target.style.background = colors.secondary}>
                  Start Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CONTACT PAGE WITH REAL MESSAGES
const Contact = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save message to localStorage
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'unread'
    };
    
    messages.push(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    
    alert('Message sent successfully! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            {translations.contact}
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.lightText,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {translations.getInTouch}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '3rem'
        }}>
          {/* Contact Information */}
          <div style={{ 
            background: 'white',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: colors.primary,
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              {translations.ourOffice}
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: colors.secondary, marginBottom: '1rem', fontSize: '1.3rem' }}>📍 {translations.location}</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Kigali City Center</p>
              <p style={{ fontSize: '1.1rem', color: colors.lightText }}>{translations.cityCenter}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: colors.secondary, marginBottom: '1rem', fontSize: '1.3rem' }}>📞 {translations.phoneNumbers}</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>+250 788 123 456</p>
              <p style={{ fontSize: '1.1rem' }}>+250 789 987 654</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: colors.secondary, marginBottom: '1rem', fontSize: '1.3rem' }}>📧 {translations.emailAddress}</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>info@kecoco.rw</p>
              <p style={{ fontSize: '1.1rem' }}>support@kecoco.rw</p>
            </div>

            <div>
              <h3 style={{ color: colors.secondary, marginBottom: '1rem', fontSize: '1.3rem' }}>🕒 {translations.businessHours}</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
              <p style={{ fontSize: '1.1rem' }}><strong>Sunday:</strong> Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ 
            background: 'white',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: colors.primary,
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              {translations.sendMessage}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.accent}
                  onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.accent}
                  onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
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
                  {translations.phoneNumber}
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.accent}
                  onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
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
                  {translations.subject} *
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.accent}
                  onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
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
                  {translations.message} *
                </label>
                <textarea 
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    transition: 'border-color 0.3s',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.accent}
                  onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
                  required
                ></textarea>
              </div>
              
              <button type="submit" style={{ 
                background: colors.secondary,
                color: 'white', 
                border: 'none', 
                padding: '1.2rem 2rem', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: '600',
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
                {translations.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// REQUEST FORM WITH REAL REQUESTS
const RequestForm = ({ translations, currentLanguage }) => {
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
    const selectedService = localStorage.getItem(STORAGE_KEYS.SELECTED_SERVICE);
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
    
    // Save service request to localStorage
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const newRequest = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      language: currentLanguage
    };
    
    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    
    // Show success message
    alert(`✅ Service request submitted successfully!\n\nWe have received your request for "${formData.service}" and will contact you at ${formData.phone} within 24 hours.`);
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SERVICE);
    
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      border: `2px solid ${colors.accent}40`,
                      borderRadius: '8px',
                      fontSize: '1.1rem'
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
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem'
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
                  color: colors.text,
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
                    border: `2px solid ${colors.accent}40`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    resize: 'vertical'
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

// ADMIN DASHBOARD WITH REAL DATA
const AdminDashboard = ({ translations }) => {
  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    pending: 0,
    completed: 0,
    revenue: 0,
    unreadMessages: 0,
    recentActivities: []
  });

  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load real data from localStorage
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    
    const totalRequests = requests.length;
    const pending = requests.filter(req => req.status === 'pending').length;
    const completed = requests.filter(req => req.status === 'completed').length;
    const unreadMessages = messages.filter(msg => msg.status === 'unread').length;
    
    // Calculate revenue (example calculation)
    const revenue = requests.reduce((total, req) => {
      if (req.status === 'completed') {
        // Simple revenue calculation based on service type
        if (req.service.includes('Irembo')) return total + 5000;
        if (req.service.includes('Tax')) return total + 10000;
        if (req.service.includes('Land')) return total + 15000;
      }
      return total;
    }, 0);

    // Recent activities
    const recentActivities = [
      ...requests.slice(-5).map(req => ({
        type: 'request',
        user: req.name,
        action: `submitted a service request for ${req.service}`,
        time: new Date(req.timestamp).toLocaleString(),
        icon: '📋'
      })),
      ...messages.slice(-3).map(msg => ({
        type: 'message',
        user: msg.name,
        action: 'sent a message',
        time: new Date(msg.timestamp).toLocaleString(),
        icon: '📧'
      }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

    setDashboardData({
      totalRequests,
      pending,
      completed,
      revenue,
      unreadMessages,
      recentActivities
    });
  };

  const handleManageRequests = () => {
    setActiveTab('requests');
  };

  const handleManageMessages = () => {
    setActiveTab('messages');
  };

  const handleMarkAsRead = (messageId) => {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    );
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updatedMessages));
    loadDashboardData();
  };

  const handleUpdateRequestStatus = (requestId, newStatus) => {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
    loadDashboardData();
  };

  const getRequests = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
  };

  const getMessages = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{ 
        background: colors.primary,
        color: 'white',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              📊 {translations.dashboard}
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
              {translations.welcomeUser}, Admin! - {translations.yourDashboard}
            </p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('admin');
              localStorage.removeItem('adminToken');
              navigate('/');
            }}
            style={{ 
              background: colors.secondary,
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#b91c1c'}
            onMouseOut={(e) => e.target.style.background = colors.secondary}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Quick Actions & Tabs */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveTab('overview')}
                style={{ 
                  background: activeTab === 'overview' ? colors.primary : colors.accent,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}>
                📊 Overview
              </button>
              <button 
                onClick={() => setActiveTab('requests')}
                style={{ 
                  background: activeTab === 'requests' ? colors.primary : colors.accent,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}>
                📋 Service Requests ({dashboardData.pending})
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                style={{ 
                  background: activeTab === 'messages' ? colors.primary : colors.accent,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}>
                📧 Messages ({dashboardData.unreadMessages})
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {[
                  { title: translations.totalRequests, value: dashboardData.totalRequests, color: colors.primary, icon: '📊' },
                  { title: translations.pending, value: dashboardData.pending, color: colors.secondary, icon: '⏳' },
                  { title: translations.completed, value: dashboardData.completed, color: '#10b981', icon: '✅' },
                  { title: 'Unread Messages', value: dashboardData.unreadMessages, color: '#8b5cf6', icon: '📧' },
                  { title: 'Revenue', value: `RWF ${dashboardData.revenue.toLocaleString()}`, color: '#f59e0b', icon: '💰' }
                ].map((stat, index) => (
                  <div key={index} style={{ 
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    borderTop: `4px solid ${stat.color}`,
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      color: colors.lightText,
                      marginBottom: '0.5rem'
                    }}>
                      {stat.title}
                    </h3>
                    <p style={{ 
                      fontSize: '2.5rem', 
                      color: stat.color,
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div style={{ 
                background: 'white',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  color: colors.primary,
                  marginBottom: '2rem',
                  fontWeight: '600'
                }}>
                  📝 Recent Activity
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: `${colors.primary}05`,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${colors.accent}`,
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                      <div style={{ 
                        background: colors.accent,
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        color: 'white'
                      }}>
                        {activity.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          fontSize: '1.1rem', 
                          margin: 0,
                          fontWeight: '500'
                        }}>
                          <strong>{activity.user}</strong> {activity.action}
                        </p>
                        <small style={{ color: colors.lightText }}>{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'requests' && (
            <div style={{ 
              background: 'white',
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                color: colors.primary,
                marginBottom: '2rem',
                fontWeight: '600'
              }}>
                📋 Service Requests
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {getRequests().map((request) => (
                  <div key={request.id} style={{ 
                    padding: '1.5rem',
                    background: request.status === 'pending' ? '#fef3c7' : '#d1fae5',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${request.status === 'pending' ? colors.secondary : '#10b981'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: colors.primary }}>{request.service}</h4>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{request.name}</p>
                        <p style={{ margin: 0, color: colors.lightText }}>{request.phone} • {request.email}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ 
                          background: request.status === 'pending' ? colors.secondary : '#10b981',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {request.status}
                        </span>
                        <p style={{ margin: '0.5rem 0 0 0', color: colors.lightText, fontSize: '0.9rem' }}>
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 1rem 0' }}>{request.description}</p>
                    {request.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                          style={{ 
                            background: '#10b981',
                            color: 'white', 
                            border: 'none', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}>
                          Mark Completed
                        </button>
                        <button 
                          onClick={() => handleUpdateRequestStatus(request.id, 'cancelled')}
                          style={{ 
                            background: colors.lightText,
                            color: 'white', 
                            border: 'none', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {getRequests().length === 0 && (
                  <p style={{ textAlign: 'center', color: colors.lightText, padding: '2rem' }}>
                    No service requests yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div style={{ 
              background: 'white',
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                color: colors.primary,
                marginBottom: '2rem',
                fontWeight: '600'
              }}>
                📧 Customer Messages
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {getMessages().map((message) => (
                  <div key={message.id} style={{ 
                    padding: '1.5rem',
                    background: message.status === 'unread' ? '#dbeafe' : '#f3f4f6',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${message.status === 'unread' ? colors.accent : colors.lightText}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: colors.primary }}>{message.subject}</h4>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{message.name}</p>
                        <p style={{ margin: 0, color: colors.lightText }}>{message.phone} • {message.email}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ 
                          background: message.status === 'unread' ? colors.accent : colors.lightText,
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {message.status}
                        </span>
                        <p style={{ margin: '0.5rem 0 0 0', color: colors.lightText, fontSize: '0.9rem' }}>
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p style={{ margin: 0 }}>{message.message}</p>
                    {message.status === 'unread' && (
                      <button 
                        onClick={() => handleMarkAsRead(message.id)}
                        style={{ 
                          background: colors.accent,
                          color: 'white', 
                          border: 'none', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          marginTop: '1rem'
                        }}>
                        Mark as Read
                      </button>
                    )}
                  </div>
                ))}
                {getMessages().length === 0 && (
                  <p style={{ textAlign: 'center', color: colors.lightText, padding: '2rem' }}>
                    No messages yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ADMIN LOGIN
const AdminLogin = ({ translations }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'kecoco2024') {
      localStorage.setItem('admin', JSON.stringify({
        username: formData.username,
        loginTime: new Date().toISOString()
      }));
      localStorage.setItem('adminToken', 'authenticated');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials! Use: admin / kecoco2024');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '3rem', 
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            background: colors.primary,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            fontSize: '2rem',
            color: 'white'
          }}>
            🔐
          </div>
          <h1 style={{ 
            fontSize: '2.2rem', 
            color: colors.primary,
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            {translations.adminAccess}
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: colors.lightText
          }}>
            {translations.restrictedArea}
          </p>
        </div>

        <div style={{ 
          background: `${colors.accent}10`,
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: `1px solid ${colors.accent}30`
        }}>
          <h3 style={{ 
            color: colors.primary,
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Test Credentials
          </h3>
          <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
            <p style={{ margin: '0.5rem 0' }}><strong>Username:</strong> admin</p>
            <p style={{ margin: '0.5rem 0' }}><strong>Password:</strong> kecoco2024</p>
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="text" 
              placeholder={translations.enterUsername}
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                border: `2px solid ${colors.accent}40`,
                borderRadius: '8px',
                fontSize: '1.1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
              required
            />
          </div>
          
          <div>
            <input 
              type="password" 
              placeholder={translations.enterPassword}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                border: `2px solid ${colors.accent}40`,
                borderRadius: '8px',
                fontSize: '1.1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = `${colors.accent}40`}
              required
            />
          </div>
          
          <button type="submit" style={{ 
            background: colors.secondary,
            color: 'white', 
            border: 'none', 
            padding: '1.2rem', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: '600',
            transition: 'background 0.3s, transform 0.3s',
            marginTop: '1rem'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#b91c1c';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = colors.secondary;
            e.target.style.transform = 'translateY(0)';
          }}>
            {translations.adminSignIn}
          </button>
        </form>
      </div>
    </div>
  );
};

// SIMPLE LOGIN & REGISTER PAGES
const Login = ({ translations }) => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem' }}>
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: colors.primary, marginBottom: '1rem', fontWeight: 'bold' }}>
        {translations.login}
      </h1>
      <p style={{ fontSize: '1.4rem', color: colors.lightText, marginBottom: '3rem' }}>
        {translations.signInToAccount}
      </p>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ fontSize: '1.2rem', color: colors.lightText }}>Login form coming soon...</p>
      </div>
    </div>
  </div>
);

const Register = ({ translations }) => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 2rem' }}>
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: colors.primary, marginBottom: '1rem', fontWeight: 'bold' }}>
        {translations.register}
      </h1>
      <p style={{ fontSize: '1.4rem', color: colors.lightText, marginBottom: '3rem' }}>
        {translations.createAccount}
      </p>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ fontSize: '1.2rem', color: colors.lightText }}>Registration form coming soon...</p>
      </div>
    </div>
  </div>
);

// HELPER FUNCTIONS
const getServiceIcon = (serviceKey) => {
  const icons = {
    government: '🏛️',
    financial: '💰',
    construction: '🏗️',
    land: '📍'
  };
  return icons[serviceKey] || '📋';
};

// MAIN APP COMPONENT
function App() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language
    const savedLanguage = localStorage.getItem('kecoco_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'rw' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('kecoco_language', newLanguage);
  };

  // Translations object
  const translations = {
    en: {
      home: "Home", services: "Services", contact: "Contact", request: "Request Service", admin: "Admin", login: "Login", register: "Register",
      welcome: "Welcome to K.E COCO Services", slogan: "Your trusted partner for all government and construction services",
      getStarted: "Get Started", learnMore: "Learn More", ourServices: "Our Services",
      governmentServices: "Government Services", financialServices: "Financial Services", constructionServices: "Construction Services",
      getInTouch: "Get in touch with K.E COCO Services", requestOurServices: "Request Our Services", fillForm: "Fill out the form below",
      fullName: "Full Name", phoneNumber: "Phone Number", email: "Email Address", subject: "Subject", message: "Message",
      submitRequest: "Submit Request", serviceType: "Service Type", selectService: "Select a service", serviceDescription: "Service Description",
      adminAccess: "Administrator Access Only", restrictedArea: "This area is restricted to authorized personnel only",
      enterUsername: "Enter admin username", enterPassword: "Enter admin password", adminSignIn: "Admin Sign In",
      dashboard: "Dashboard", welcomeUser: "Welcome", yourDashboard: "Your K.E COCO Services Dashboard",
      signInToAccount: "Sign in to your K.E COCO account", createAccount: "Create Account",
      location: "Location", emailAddress: "Email Address", phoneNumbers: "Phone Numbers", businessHours: "Business Hours",
      cityCenter: "We are located in the heart of Kigali city center", ourOffice: "Our Office", sendMessage: "Send us a Message", send: "Send Message",
      personalInformation: "Personal Information", serviceDetails: "Service Details", supportingDocuments: "Supporting Documents",
      totalRequests: "Total Requests", pending: "Pending", completed: "Completed", comprehensiveSolutions: "Comprehensive solutions for all your government and construction needs"
    },
    rw: {
      home: "Ahabanza", services: "Serivisi", contact: "Twandikire", request: "Saba Serivisi", admin: "Umuyobozi", login: "Injira", register: "Iyandikishe",
      welcome: "Murakaza neza kuri K.E COCO Services", slogan: "Umufasha wanyu wizewe mu serivisi z'igihugu no kubaka",
      getStarted: "Tangira", learnMore: "Menya byinshi", ourServices: "Serivisi zacu",
      governmentServices: "Serivisi z'Igihugu", financialServices: "Serivisi z'Imari", constructionServices: "Serivisi zo Kubaka",
      getInTouch: "Twandikire kuri K.E COCO Services", requestOurServices: "Saba Serivisi zacu", fillForm: "Uzuza fomu hepfo",
      fullName: "Amazina yuzuye", phoneNumber: "Numero ya Telefone", email: "Aderesi ya Email", subject: "Insanganyamatsiko", message: "Ubutumwa",
      submitRequest: "Ohereza Usabe", serviceType: "Ubwoko bwa Serivisi", selectService: "Hitamo serivisi", serviceDescription: "Ibisobanuro ku Serivisi",
      adminAccess: "Uru ruhande rwemerera abayobozi gusa", restrictedArea: "Uru ruhande rwemerera abantu bafite uburenganzira gusa",
      enterUsername: "Andika izina ry'umuyobozi", enterPassword: "Andika ijambo ry'ibanga", adminSignIn: "Injira nk'Umuyobozi",
      dashboard: "Ikibaho", welcomeUser: "Murakaza neza", yourDashboard: "Ikibaho cyawe cya K.E COCO Services",
      signInToAccount: "Injira mu konti yawe ya K.E COCO", createAccount: "Kora Konti",
      location: "Aho turi", emailAddress: "Aderesi ya Email", phoneNumbers: "Numero z'amaguru", businessHours: "Amasaha y'akazi",
      cityCenter: "Turi mu gace k'umurwa w'igihugu Kigali", ourOffice: "Ofisi yacu", sendMessage: "Twohereze ubutumwa", send: "Ohereza Ubutumwa",
      personalInformation: "Amakuru y'umuntu", serviceDetails: "Ibisobanuro ku Serivisi", supportingDocuments: "Inyandiko zishyigikira",
      totalRequests: "Imisabe Yose", pending: "Itegereje", completed: "Byakozwe", comprehensiveSolutions: "Ibisubizo byuzuye kuri byose ukeneye mu serivisi z'igihugu no kubaka"
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          translations={translations[language]} 
          toggleLanguage={toggleLanguage}
          currentLanguage={language}
        />
        
        <Routes>
          <Route path="/" element={<Home translations={translations[language]} currentLanguage={language} />} />
          <Route path="/services" element={<Services translations={translations[language]} currentLanguage={language} />} />
          <Route path="/service/:serviceKey" element={<ServiceDetail translations={translations[language]} currentLanguage={language} />} />
          <Route path="/contact" element={<Contact translations={translations[language]} />} />
          <Route path="/request" element={<RequestForm translations={translations[language]} currentLanguage={language} />} />
          <Route path="/admin/login" element={<AdminLogin translations={translations[language]} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard translations={translations[language]} />} />
          <Route path="/login" element={<Login translations={translations[language]} />} />
          <Route path="/register" element={<Register translations={translations[language]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;