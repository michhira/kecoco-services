import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaMoneyBillWave, 
  FaHardHat, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';

const Services = ({ translations, currentLanguage }) => {
  const navigate = useNavigate();

  const colors = {
    primary: '#1e3a8a',
    secondary: '#dc2626',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#ffff',
    lightText: '#6b7280'
  };

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
        duration: "1-2 business days",
        icon: <FaBuilding />
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
        duration: "1 business day",
        icon: <FaMoneyBillWave />
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
        duration: "Varies by project",
        icon: <FaHardHat />
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
        duration: "3-5 business days",
        icon: <FaMapMarkerAlt />
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
        duration: "Iminsi 1-2 y'akazi",
        icon: <FaBuilding />
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
        duration: "Umunsi umwe w'akazi",
        icon: <FaMoneyBillWave />
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
        duration: "Bihindagurika bitewe n'umushinga",
        icon: <FaHardHat />
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
        duration: "Iminsi 3-5 y'akazi",
        icon: <FaMapMarkerAlt />
      }
    }
  };

  const handleServiceClick = (serviceKey) => {
    // Save selected service to localStorage
    localStorage.setItem('kecoco_selected_service', serviceKey);
    navigate(`/service/${serviceKey}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.ourServices}
          </h1>
          <p style={{ 
            fontSize: '1.3rem',
            color: colors.lightText,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {translations.comprehensiveSolutions}
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {Object.entries(servicesData[currentLanguage]).map(([key, service]) => (
            <div 
              key={key}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: '0 4px #fff(0, 0, 0, 0.1)',
                border: `1px solid #e2e8f0`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => handleServiceClick(key)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px #fff(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px #fff(0, 0, 0, 0.1)';
              }}
            >
              {/* Service Icon */}
              <div style={{
                fontSize: '3rem',
                color: colors.primary,
                marginBottom: '1.5rem'
              }}>
                {service.icon}
              </div>

              {/* Service Title & Description */}
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
                lineHeight: '1.6'
              }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ 
                  fontSize: '1.1rem',
                  color: colors.text,
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {currentLanguage === 'en' ? 'Key Features:' : 'Ibikubiyemo:'}
                </h4>
                <ul style={{ 
                  color: colors.lightText,
                  paddingLeft: '1.2rem',
                  lineHeight: '1.6'
                }}>
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Duration */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#f1f5f9',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaStar style={{ color: colors.secondary }} />
                  <span style={{ fontWeight: '600', color: colors.text }}>
                    {service.price}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaClock style={{ color: colors.primary }} />
                  <span style={{ color: colors.lightText }}>
                    {service.duration}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                style={{
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = colors.accent}
                onMouseOut={(e) => e.target.style.background = colors.primary}
              >
                <FaArrowRight />
                {currentLanguage === 'en' ? 'View Details' : 'Reba Ibisobanuro'}
              </button>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '3rem',
          boxShadow: '0 4px 20px #fff(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            color: colors.primary,
            marginBottom: '3rem',
            fontWeight: 'bold'
          }}>
            {currentLanguage === 'en' ? 'How It Works' : 'Uko Bikora'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { step: '1', title: currentLanguage === 'en' ? 'Choose Service' : 'Hitamo Serivisi', icon: <FaCheckCircle /> },
              { step: '2', title: currentLanguage === 'en' ? 'Submit Request' : 'Ohereza Gusaba', icon: <FaBuilding /> },
              { step: '3', title: currentLanguage === 'en' ? 'We Process' : 'Tuzagenzura', icon: <FaMoneyBillWave /> },
              { step: '4', title: currentLanguage === 'en' ? 'Receive Service' : 'Uzakira Serivisi', icon: <FaStar /> }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: colors.primary,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '2rem'
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: colors.primary,
                  marginBottom: '0.5rem'
                }}>
                  {item.step}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: colors.text,
                  fontWeight: '500'
                }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;