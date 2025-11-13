// ADD THIS COMPONENT BEFORE MAIN APP COMPONENT

// FOOTER COMPONENT WITH LOGO
const Footer = ({ translations, currentLanguage }) => {
  return (
    <footer style={{ 
      background: colors.primary,
      color: 'white',
      padding: '3rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem'
      }}>
        {/* Company Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img 
              src="/kecoco-logo.png" 
              alt="K.E COCO Services" 
              style={{ 
                height: '50px', 
                width: 'auto',
                borderRadius: '8px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>K.E COCO SERVICES</h3>
          </div>
          <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
            Your trusted partner for all government and construction services in Rwanda.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: colors.accent }}>Contact Info</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaMapMarkerAlt />
              <span>Kigali City Center, Rwanda</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaPhone />
              <span>+250 788 123 456</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaEnvelope />
              <span>info@kecoco.rw</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: colors.accent }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/services" style={{ color: '#d1d5db', textDecoration: 'none' }}>Our Services</a>
            <a href="/contact" style={{ color: '#d1d5db', textDecoration: 'none' }}>Contact Us</a>
            <a href="/request" style={{ color: '#d1d5db', textDecoration: 'none' }}>Request Service</a>
            <a href="/admin/login" style={{ color: '#d1d5db', textDecoration: 'none' }}>Admin Login</a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid #374151',
        color: '#9ca3af'
      }}>
        <p>&copy; 2024 K.E COCO Services. All rights reserved.</p>
      </div>
    </footer>
  );
};