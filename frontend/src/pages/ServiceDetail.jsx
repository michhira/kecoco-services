import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetail = ({ translations, currentLanguage }) => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();

  const servicesData = {
    en: {
      government: {
        title: "Government Services",
        description: "Complete government service solutions through Irembo platform",
        price: "5,000 RWF"
      },
      financial: {
        title: "Financial Services", 
        description: "Tax payment and financial consulting services",
        price: "10,000 RWF"
      },
      construction: {
        title: "Construction Services",
        description: "Complete construction and building solutions",
        price: "Contact for Quote"
      },
      land: {
        title: "Land Services",
        description: "Land registration and documentation services", 
        price: "15,000 RWF"
      }
    },
    rw: {
      government: {
        title: "Serivisi z'Igihugu",
        description: "Serivisi z'igihugu zuzuye muri platform ya Irembo",
        price: "RWF 5,000"
      },
      financial: {
        title: "Serivisi z'Imari",
        description: "Gushora amafaranga no kugisha inama ku by'imari",
        price: "RWF 10,000"
      },
      construction: {
        title: "Serivisi zo Kubaka", 
        description: "Ibisubizo byuzuye byo kubaka no gutera",
        price: "Twandikire Tukubwire igiciro"
      },
      land: {
        title: "Serivisi z'Ubutaka",
        description: "Serivisi zo kwiyandikisha ubutaka no gutunganya inyandiko",
        price: "RWF 15,000"
      }
    }
  };

  const service = servicesData[currentLanguage]?.[serviceKey];

  if (!service) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Service not found</h2>
        <button onClick={() => navigate('/services')}>Back to Services</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/services')}
        style={{ marginBottom: '2rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        ← Back to Services
      </button>
      
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p><strong>Price:</strong> {service.price}</p>
      
      <button 
        onClick={() => navigate('/request')}
        style={{ 
          background: '#1e3a8a', 
          color: 'white', 
          padding: '0.75rem 1.5rem', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        {translations?.request || 'Request Service'}
      </button>
    </div>
  );
};

export default ServiceDetail;