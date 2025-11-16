import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, 
  FaUsers, 
  FaFileAlt, 
  FaEnvelope,
  FaChartBar,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUpload,
  FaDownload,
  FaTrash,
  FaEye,
  FaFolder
} from 'react-icons/fa';

const AdminDashboard = ({ translations }) => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    completed: 0,
    messages: 0,
    documents: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const colors = {
    primary: '#1e3a8a',
    secondary: '#dc2626',
    accent: '#dc2626',
    background: '#ffffff',
    text: '#1f2937',
    lightText: '#6b7280'
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('kecoco_admin');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    // Load data from localStorage
    const requests = JSON.parse(localStorage.getItem('kecoco_service_requests') || '[]');
    const messages = JSON.parse(localStorage.getItem('kecoco_messages') || '[]');
    const docs = JSON.parse(localStorage.getItem('kecoco_documents') || '[]');

    // Calculate stats
    setStats({
      totalRequests: requests.length,
      pending: requests.filter(req => req.status === 'pending').length,
      completed: requests.filter(req => req.status === 'completed').length,
      messages: messages.length,
      documents: docs.length
    });

    // Get recent data
    setRecentRequests(requests.slice(-5).reverse());
    setRecentMessages(messages.slice(-5).reverse());
    setDocuments(docs.slice(-10).reverse());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kecoco_admin');
    navigate('/admin/login');
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newDocuments = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Admin'
      }));

      const updatedDocuments = [...documents, ...newDocuments];
      setDocuments(updatedDocuments);
      localStorage.setItem('kecoco_documents', JSON.stringify(updatedDocuments));
      
      setStats(prev => ({
        ...prev,
        documents: updatedDocuments.length
      }));
    }
  };

  const deleteDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem('kecoco_documents', JSON.stringify(updatedDocuments));
    
    setStats(prev => ({
      ...prev,
      documents: updatedDocuments.length
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle style={{ color: '#10b981' }} />;
      case 'pending': return <FaClock style={{ color: '#f59e0b' }} />;
      default: return <FaExclamationTriangle style={{ color: '#ef4444' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      default: return '#ef4444';
    }
  };

  const statCards = [
    {
      title: translations.totalRequests,
      value: stats.totalRequests,
      icon: <FaFileAlt />,
      color: colors.primary
    },
    {
      title: translations.pending,
      value: stats.pending,
      icon: <FaClock />,
      color: '#f59e0b'
    },
    {
      title: translations.completed,
      value: stats.completed,
      icon: <FaCheckCircle />,
      color: '#10b981'
    },
    {
      title: translations?.messages || 'Messages',
      value: stats.messages,
      icon: <FaEnvelope />,
      color: colors.secondary
    },
    {
      title: 'Documents',
      value: stats.documents,
      icon: <FaFolder />,
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: colors.primary,
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {translations.adminDashboard}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            {translations.yourDashboard}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            background: colors.secondary,
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = colors.secondary}
        >
          <FaSignOutAlt />
          {translations?.logout || 'Logout'}
        </button>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {['overview', 'documents', 'requests', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                fontWeight: '600',
                color: activeTab === tab ? colors.secondary : colors.lightText,
                borderBottom: activeTab === tab ? `3px solid ${colors.secondary}` : '3px solid transparent',
                transition: 'all 0.3s'
              }}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'documents' && 'Documents'}
              {tab === 'requests' && 'Service Requests'}
              {tab === 'messages' && 'Messages'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Welcome Section */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem',
              border: `1px solid #e2e8f0`
            }}>
              <h2 style={{ 
                fontSize: '1.8rem',
                color: colors.text,
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                {translations.welcomeUser}, Admin! 👋
              </h2>
              <p style={{ color: colors.lightText }}>
                {translations?.dashboardDesc || 'Here\'s what\'s happening with your service requests today.'}
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {statCards.map((card, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: `1px solid #e2e8f0`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `${card.color}20`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: card.color
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: colors.text,
                      lineHeight: '1'
                    }}>
                      {card.value}
                    </div>
                    <div style={{
                      color: colors.lightText,
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {card.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '2rem'
            }}>
              {/* Recent Requests */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: `1px solid #e2e8f0`
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  color: colors.text,
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaFileAlt />
                  {translations?.recentRequests || 'Recent Service Requests'}
                </h3>
                
                {recentRequests.length === 0 ? (
                  <p style={{ color: colors.lightText, textAlign: 'center', padding: '2rem' }}>
                    No service requests yet
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {recentRequests.map((request) => (
                      <div 
                        key={request.id}
                        style={{
                          padding: '1rem',
                          border: `1px solid #e2e8f0`,
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ 
                            fontWeight: '600',
                            color: colors.text,
                            marginBottom: '0.3rem'
                          }}>
                            {request.service}
                          </div>
                          <div style={{ 
                            fontSize: '0.8rem',
                            color: colors.lightText
                          }}>
                            {request.name} • {request.phone}
                          </div>
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                          color: getStatusColor(request.status),
                          fontWeight: '600'
                        }}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Messages */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: `1px solid #e2e8f0`
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  color: colors.text,
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaEnvelope />
                  {translations?.recentMessages || 'Recent Messages'}
                </h3>
                
                {recentMessages.length === 0 ? (
                  <p style={{ color: colors.lightText, textAlign: 'center', padding: '2rem' }}>
                    No messages yet
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {recentMessages.map((message) => (
                      <div 
                        key={message.id}
                        style={{
                          padding: '1rem',
                          border: `1px solid #e2e8f0`,
                          borderRadius: '8px'
                        }}
                      >
                        <div style={{ 
                          fontWeight: '600',
                          color: colors.text,
                          marginBottom: '0.3rem'
                        }}>
                          {message.subject}
                        </div>
                        <div style={{ 
                          fontSize: '0.8rem',
                          color: colors.lightText,
                          marginBottom: '0.5rem'
                        }}>
                          From: {message.name} ({message.email})
                        </div>
                        <div style={{ 
                          fontSize: '0.9rem',
                          color: colors.text,
                          lineHeight: '1.4'
                        }}>
                          {message.message.length > 100 
                            ? `${message.message.substring(0, 100)}...` 
                            : message.message
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: `1px solid #e2e8f0`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.8rem',
                color: colors.text,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaFolder />
                Documents Management
              </h2>
              
              <label style={{
                background: colors.secondary,
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#b91c1c'}
              onMouseOut={(e) => e.target.style.background = colors.secondary}
              >
                <FaUpload />
                Upload Documents
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {documents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: colors.lightText }}>
                <FaFolder style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ marginBottom: '0.5rem' }}>No documents uploaded yet</h3>
                <p>Upload documents to get started</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {documents.map((doc) => (
                  <div 
                    key={doc.id}
                    style={{
                      padding: '1.5rem',
                      border: `1px solid #e2e8f0`,
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <FaFileAlt style={{ fontSize: '1.5rem', color: colors.primary }} />
                      <div>
                        <div style={{ fontWeight: '600', color: colors.text }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: colors.lightText }}>
                          {doc.size} • Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        style={{
                          background: colors.primary,
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaEye />
                        View
                      </button>
                      <button 
                        style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaDownload />
                        Download
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        style={{
                          background: colors.secondary,
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: `1px solid #e2e8f0`
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              color: colors.text,
              marginBottom: '2rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaFileAlt />
              Service Requests Management
            </h2>
            {/* Add service requests management content here */}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: `1px solid #e2e8f0`
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              color: colors.text,
              marginBottom: '2rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaEnvelope />
              Messages Management
            </h2>
            {/* Add messages management content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;