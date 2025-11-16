import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaWhatsapp,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa';

const Contact = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const colors = {
    primary: '#1e3a8a',     // Blue - for header
    secondary: '#dc2626',   // Red - for all buttons
    accent: '#dc2626',      // Red - for accents
    background: '#ffffff',  // White - for all backgrounds
    text: '#ffffff',        // WHITE - for text (changed from black)
    lightText: '#f3f4f6'    // Light Gray - for secondary text
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save message to localStorage
    const messages = JSON.parse(localStorage.getItem('kecoco_messages') || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    localStorage.setItem('kecoco_messages', JSON.stringify(messages));
    
    alert(translations?.messageSent || 'Message sent successfully! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: translations.phoneNumbers,
      details: ['+250 788 123 456', '+250 790231754'],
      link: 'tel:+250790231754'
    },
    {
      icon: <FaEnvelope />,
      title: translations.emailAddress,
      details: ['eliekwizera552@gmail.com'],
      link: 'http://emailto:'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: translations.location,
      details: [translations.cityCenter],
      link: 'https://maps.google.com/?q=Bugesera+Center,Rwanda'
    },
    {
      icon: <FaClock />,
      title: translations.businessHours,
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      link: null
    }
  ];

  const socialMedia = [
    { icon: <FaWhatsapp />, name: 'WhatsApp', link: 'https://wa.me/250790231754' },
    { icon: <FaFacebook />, name: 'Facebook', link: 'https://facebook.com/kecoco' },
    { icon: <FaTwitter />, name: 'Twitter', link: 'https://twitter.com/kecoco' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: colors.primary,  // Blue for header
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {translations.contactUs}
          </h1>
          <p style={{ 
            fontSize: '1.3rem',
            color: colors.primary,  // Blue for subheader
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {translations.getInTouch}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem'
        }}>
          {/* Contact Information */}
          <div>
            <h2 style={{ 
              fontSize: '2rem',
              color: colors.primary,  // Blue for headers
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              {translations.ourOffice}
            </h2>
            
            {/* Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    background: '#f8fafc',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: `1px solid #e2e8f0`,
                    cursor: item.link ? 'pointer' : 'default',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => item.link && (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseOut={(e) => item.link && (e.currentTarget.style.transform = 'translateY(0)')}
                  onClick={() => item.link && window.open(item.link, '_blank')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      color: colors.secondary,  // Red for icons
                      marginTop: '0.2rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.2rem',
                        color: colors.primary,  // Blue for titles
                        marginBottom: '0.5rem',
                        fontWeight: '600'
                      }}>
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} style={{ 
                          color: colors.primary,  // Blue for details
                          marginBottom: '0.3rem',
                          lineHeight: '1.4'
                        }}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h3 style={{ 
                fontSize: '1.5rem',
                color: colors.primary,  // Blue for headers
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                {translations?.followUs || 'Follow Us'}
              </h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: colors.secondary,  // Red for social icons
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.3rem',
                      textDecoration: 'none',
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
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#f8fafc',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: `1px solid #e2e8f0`
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              color: colors.primary,  // Blue for headers
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              {translations.sendMessage}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary  // Blue for labels
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
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.secondary}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary  // Blue for labels
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
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.secondary}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary  // Blue for labels
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
                      border: `2px solid #e2e8f0`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.secondary}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: colors.primary  // Blue for labels
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
                      border: `2px solid #e2e8f0`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      color: '#1f2937',  // Dark gray for input text
                      background: 'white'
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.secondary}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: colors.primary  // Blue for labels
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
                    border: `2px solid #e2e8f0`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s',
                    color: '#1f2937',  // Dark gray for textarea text
                    background: 'white'
                  }}
                  required
                  onFocus={(e) => e.target.style.borderColor = colors.secondary}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{
                  background: colors.secondary,  // Red button
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 2rem',
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
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = colors.secondary;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FaPaperPlane />
                {translations.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;