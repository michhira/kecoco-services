import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Import page components
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RequestForm from './pages/RequestForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ServiceDetail from './pages/ServiceDetail';

// Import React Icons
import { 
  FaHome, 
  FaEnvelope, 
  FaFileAlt, 
  FaUserShield, 
  FaPhone,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaHandshake,
  FaUser,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaHardHat
} from 'react-icons/fa';

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

// K.E COCO LOGO COMPONENT WITH IMAGE
const KECoCoLogo = ({ size = 'medium', showText = true, centered = false }) => {
  const sizes = {
    small: { container: '40px', font: '1rem', text: '1rem' },
    medium: { container: '50px', font: '1.2rem', text: '1.5rem' },
    large: { container: '100px', font: '2rem', text: '2.5rem' },
    xlarge: { container: '150px', font: '3rem', text: '3.5rem' }
  };

  const style = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      justifyContent: centered ? 'center' : 'flex-start',
      flexDirection: centered ? 'column' : 'row'
    },
    logo: {
      width: sizes[size].container,
      height: sizes[size].container,
      borderRadius: size === 'large' || size === 'xlarge' ? '20px' : '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: sizes[size].font,
      color: 'white',
      boxShadow: '0 4px 15px #fff(0, 0, 0, 0.2)',
      border: size === 'large' || size === 'xlarge' ? '4px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden'
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    text: {
      fontWeight: 'bold',
      fontSize: sizes[size].text,
      color: colors.primary,
      textAlign: centered ? 'center' : 'left'
    }
  };

  return (
    <div style={style.container}>
      <div style={style.logo}>
        <img 
          src="/src/assets/kecoco.jpg" 
          alt="K.E COCO Logo" 
          style={style.logoImage}
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
            e.target.parentElement.innerHTML = 'KE';
          }}
        />
      </div>
      {showText && (
        <div style={style.text}>
          COCO SERVICES
        </div>
      )}
    </div>
  );
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

// STYLED NAVBAR COMPONENT WITH K.E COCO LOGO
const Navbar = ({ translations, toggleLanguage, currentLanguage }) => {
  const navigate = useNavigate();
  
  return (
    <nav style={{ 
      background: colors.primary,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      boxShadow: '0 4px 6px #fff(0, 0, 0, 0.1)',
      fontSize: '1.1rem'
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {/* K.E COCO Logo */}
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          <KECoCoLogo size="medium" showText={true} />
        </div>
        
        <div 
          onClick={() => navigate('/')}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.background = colors.accent}
          onMouseOut={(e) => e.target.style.background = 'transparent'}>
          <FaHome />
          {translations.home}
        </div>
        <div 
          onClick={() => navigate('/services')}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.background = colors.accent}
          onMouseOut={(e) => e.target.style.background = 'transparent'}>
          <FaBuilding />
          {translations.services}
        </div>
        <div 
          onClick={() => navigate('/contact')}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.background = colors.accent}
          onMouseOut={(e) => e.target.style.background = 'transparent'}>
          <FaEnvelope />
          {translations.contact}
        </div>
        <div 
          onClick={() => navigate('/request')}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.background = colors.accent}
          onMouseOut={(e) => e.target.style.background = 'transparent'}>
          <FaFileAlt />
          {translations.request}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div 
          onClick={() => navigate('/admin/login')}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.background = colors.accent}
          onMouseOut={(e) => e.target.style.background = 'transparent'}>
          <FaUserShield />
          {translations.admin}
        </div>
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
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = colors.secondary}
        >
          <FaGlobe />
          {currentLanguage === 'en' ? 'Kinyarwanda' : 'English'}
        </button>
      </div>
    </nav>
  );
};

// MAIN APP COMPONENT
const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact',
      request: 'Request Service',
      admin: 'Admin',
      welcome: 'Welcome to K.E COCO Services',
      slogan: 'Your trusted partner for government and business services in Rwanda',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      ourServices: 'Our Services',
      comprehensiveSolutions: 'Comprehensive solutions for all your service needs',
      contactUs: 'Contact Us',
      getInTouch: 'Get in touch with our team for any inquiries',
      ourOffice: 'Our Office',
      location: 'Location',
      cityCenter: 'Kigali City Center, Rwanda',
      phoneNumbers: 'Phone Numbers',
      emailAddress: 'Email Address',
      businessHours: 'Business Hours',
      sendMessage: 'Send Message',
      fullName: 'Full Name',
      email: 'Email Address',
      phoneNumber: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      requestOurServices: 'Request Our Services',
      fillForm: 'Fill out the form below to request our services',
      personalInformation: 'Personal Information',
      serviceDetails: 'Service Details',
      serviceType: 'Service Type',
      selectService: 'Select a Service',
      serviceDescription: 'Service Description',
      submitRequest: 'Submit Request',
      adminAccess: 'Admin Access',
      restrictedArea: 'Restricted Area - Authorized Personnel Only',
      enterUsername: 'Enter username',
      enterPassword: 'Enter password',
      adminSignIn: 'Admin Sign In',
      adminDashboard: 'Admin Dashboard',
      dashboard: 'Dashboard',
      welcomeUser: 'Welcome',
      yourDashboard: 'Your Dashboard',
      totalRequests: 'Total Requests',
      pending: 'Pending',
      completed: 'Completed'
    },
    rw: {
      home: 'Ahabanza',
      services: 'Serivisi',
      contact: 'Twandikire',
      request: 'Saba Serivisi',
      admin: 'Umuyobozi',
      welcome: 'Murakaza neza kuri K.E COCO Services',
      slogan: 'Umufatanyabikorwa wizewe mu serivisi z\'igihugu n\'ubucuruzi mu Rwanda',
      getStarted: 'Tangira',
      learnMore: 'Menya Birenzeho',
      ourServices: 'Serivisi Zacu',
      comprehensiveSolutions: 'Ibisubizo byuzuye kuribyose ukeneye mu serivisi',
      contactUs: 'Twandikire',
      getInTouch: 'Twandikire kuribyose ushaka kubaza',
      ourOffice: 'iBiro Byacu',
      location: 'Aho turi',
      cityCenter: 'bugesera center, u Rwanda',
      phoneNumbers: 'Numero z\'amafoni',
      emailAddress: 'Aderesi ya imeyili',
      businessHours: 'Amasaha y\'akazi',
      sendMessage: 'Ohereza Ubutumwa',
      fullName: 'Amazina yuzuye',
      email: 'Aderesi ya imeyili',
      phoneNumber: 'Numero ya fone',
      subject: 'Insanganyamatsiko',
      message: 'Ubutumwa',
      send: 'Ohereza Ubutumwa',
      requestOurServices: 'Saba Serivisi Zacu',
      fillForm: 'Uzuza foromo hepfo kugirango usabe serivisi zacu',
      personalInformation: 'Amakuru y\'umuntu',
      serviceDetails: 'Ibisobanuro bya Serivisi',
      serviceType: 'Ubwoko bwa Serivisi',
      selectService: 'Hitamo Serivisi',
      serviceDescription: 'Ibisobanuro bya Serivisi',
      submitRequest: 'Ohereza Gusaba',
      adminAccess: 'Kwinjira mu Buyobozi',
      restrictedArea: 'Aharambuwe - Abantu Bafite Uruhushya Gusa',
      enterUsername: 'Injiza izina ry\'umukoresha',
      enterPassword: 'Injiza ijambobanga',
      adminSignIn: 'Injira mu Buyobozi',
      adminDashboard: 'Ikibaho cy\'Umuyobozi',
      dashboard: 'Ikibaho',
      welcomeUser: 'Murakaza neza',
      yourDashboard: 'Ikibaho Cyawe',
      totalRequests: 'Ibyasabwe Byose',
      pending: 'Bitegereje',
      completed: 'Byarakozwe'
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'rw' : 'en');
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          translations={translations[currentLanguage]} 
          toggleLanguage={toggleLanguage}
          currentLanguage={currentLanguage}
        />
        <Routes>
          <Route path="/" element={
            <Home translations={translations[currentLanguage]} />
          } />
          <Route path="/services" element={
            <Services 
              translations={translations[currentLanguage]} 
              currentLanguage={currentLanguage}
            />
          } />
          <Route path="/service/:serviceKey" element={
            <ServiceDetail 
              translations={translations[currentLanguage]} 
              currentLanguage={currentLanguage}
            />
          } />
          <Route path="/contact" element={
            <Contact translations={translations[currentLanguage]} />
          } />
          <Route path="/request" element={
            <RequestForm 
              translations={translations[currentLanguage]} 
              currentLanguage={currentLanguage}
            />
          } />
          <Route path="/admin/login" element={
            <AdminLogin translations={translations[currentLanguage]} />
          } />
          <Route path="/admin/dashboard" element={
            <AdminDashboard translations={translations[currentLanguage]} />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;