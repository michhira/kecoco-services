const AdminDashboard = ({ translations }) => {
  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    pending: 0,
    completed: 0,
    revenue: 0,
    recentActivities: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading real data
    const loadDashboardData = () => {
      setDashboardData({
        totalRequests: 156,
        pending: 23,
        completed: 133,
        revenue: 4200000,
        recentActivities: [
          { user: 'John Doe', action: 'submitted a new service request', time: '2 hours ago', icon: '🆕' },
          { user: 'Tax Payment', action: 'request completed successfully', time: '5 hours ago', icon: '✅' },
          { user: 'Jane Smith', action: 'contacted customer support', time: '1 day ago', icon: '📞' },
          { user: 'Land Registration', action: 'new service package created', time: '2 days ago', icon: '📋' }
        ]
      });
    };

    loadDashboardData();
  }, []);

  const handleManageRequests = () => {
    alert('Opening Request Management System...');
    // Here you would navigate to a requests management page
  };

  const handleViewAnalytics = () => {
    alert('Opening Analytics Dashboard...');
    // Here you would navigate to analytics page
  };

  const handleManageServices = () => {
    alert('Opening Service Management...');
    // Here you would navigate to services management page
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
          {/* Quick Actions */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: colors.primary,
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              🚀 Quick Actions
            </h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleManageRequests}
                style={{ 
                  background: colors.accent,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
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
                📋 Manage Requests
              </button>
              <button 
                onClick={handleViewAnalytics}
                style={{ 
                  background: colors.secondary,
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
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
                📈 View Analytics
              </button>
              <button 
                onClick={handleManageServices}
                style={{ 
                  background: '#10b981',
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background 0.3s, transform 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#059669';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#10b981';
                  e.target.style.transform = 'translateY(0)';
                }}>
                🛠️ Manage Services
              </button>
            </div>
          </div>

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
              { title: 'Revenue', value: `RWF ${dashboardData.revenue.toLocaleString()}`, color: '#8b5cf6', icon: '💰' }
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
        </div>
      </div>
    </div>
  );
};