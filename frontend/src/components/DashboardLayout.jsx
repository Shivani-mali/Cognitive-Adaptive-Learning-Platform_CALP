import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('calp_recent_chats');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'What is a planet?', isPinned: true },
      { id: '2', title: 'Explaining Variables', isPinned: false },
      { id: '3', title: 'History of AI', isPinned: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('calp_recent_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('calp_recent_chats');
      if (saved) {
        setChats(JSON.parse(saved));
      }
    };
    window.addEventListener('chatsUpdated', handleStorageChange);
    return () => window.removeEventListener('chatsUpdated', handleStorageChange);
  }, []);

  const createNewChat = () => {
    window.location.href = '/learning';
  };

  const deleteChat = (id) => {
    setChats(chats.filter(c => c.id !== id));
  };

  const togglePin = (id) => {
    setChats(chats.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isGuest');
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Home': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
      case 'Learning Modes': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>;
      case 'History': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
      case 'Progress': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
      default: return null;
    }
  };

  const menuItems = [
    { name: 'Home', path: '/student-home' },
    { name: 'Learning Modes', path: '/preferences' },
    { name: 'History', path: '/history' },
    { name: 'Progress', path: '/progress' },
  ];

  return (
    <div className="dashboard-container">
      {/* Mobile Top Bar */}
      <div className="mobile-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/calpLogo.png" alt="CALP Logo" style={{ height: '30px', objectFit: 'contain' }} />
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--action-dark)', fontWeight: 'bold' }}>CALP</h2>
        </div>
        <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
               <>
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
               </>
            ) : (
               <>
                 <line x1="3" y1="12" x2="21" y2="12"></line>
                 <line x1="3" y1="6" x2="21" y2="6"></line>
                 <line x1="3" y1="18" x2="21" y2="18"></line>
               </>
            )}
          </svg>
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Left Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-header">
            <img src="/calpLogo.png" alt="CALP Logo" style={{ height: '35px', objectFit: 'contain' }} />
            <h2>CALP</h2>
          </div>

          <nav className="sidebar-nav">
            <button className="new-chat-btn" onClick={createNewChat}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>New chat</span>
            </button>
            <div className="nav-divider"></div>

            {menuItems.map(item => (
              <button
                key={item.name}
                className="nav-btn"
                onClick={() => {
                  if (!item.path.startsWith('#')) {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                style={{
                  backgroundColor: location.pathname === item.path ? 'var(--action-light)' : 'transparent',
                  color: location.pathname === item.path ? 'var(--action-dark)' : 'var(--text-color)',
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  cursor: 'pointer'
                }}
              >
                <span className="nav-icon">{getIcon(item.name)}</span>
                <span className="nav-text">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="recent-chats-section">
            <h3 className="recent-chats-title">Recent Chats</h3>
            <div className="recent-chats-list">
              {[...chats].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map(chat => (
                <div key={chat.id} className="chat-item">
                  <div className="chat-title" onClick={() => navigate('/learning')}>
                    {chat.title}
                  </div>
                  <div className="chat-actions">
                    <button 
                      onClick={() => togglePin(chat.id)} 
                      className={`action-btn ${chat.isPinned ? 'pinned' : ''}`}
                      title={chat.isPinned ? "Unpin chat" : "Pin chat"}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={chat.isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="17" x2="12" y2="22"></line>
                        <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.68a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteChat(chat.id)} 
                      className="action-btn delete"
                      title="Delete chat"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="user-profile">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'Student')}&background=4F46E5&color=fff&rounded=true&size=100`}
              alt="Profile"
              className="profile-img"
            />
            <div className="profile-info">
              <div className="profile-name">{user.displayName || 'Student'}</div>
              <div className="profile-email">{user.email}</div>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {children}
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg-color);
          position: relative;
        }
        
        .mobile-top-bar {
          display: none;
        }
        
        .sidebar {
          width: 260px;
          border-right: 1px solid var(--border-color);
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          background-color: var(--sidebar-color);
          justify-content: space-between;
          flex-shrink: 0;
          z-index: 50;
        }
        .sidebar-header {
          padding-left: 1rem;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-header h2 {
          color: var(--action-dark);
          margin: 0;
          font-size: 1.8rem;
          font-weight: bold;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.2rem;
          border: none;
          border-radius: 12px;
          text-align: left;
          box-shadow: none;
          justify-content: flex-start;
          transition: background-color 0.2s;
        }
        .nav-icon {
          display: flex;
          align-items: center;
        }

        .new-chat-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.8rem 1.2rem;
          background-color: #4F46E5;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .new-chat-btn:hover {
          background-color: #4338CA;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
        }

        .nav-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 0.5rem 0;
        }

        .recent-chats-section {
          margin-top: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .recent-chats-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
          margin: 0 0 0.5rem 1rem;
          font-weight: 600;
        }

        .recent-chats-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow-y: auto;
          flex: 1;
          padding-right: 0.5rem;
        }

        /* Custom Scrollbar for chats */
        .recent-chats-list::-webkit-scrollbar {
          width: 4px;
        }
        .recent-chats-list::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }

        .chat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          color: var(--text-color);
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }

        .chat-item:hover {
          background-color: rgba(0,0,0,0.04);
        }

        .chat-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .chat-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .chat-item:hover .chat-actions {
          opacity: 1;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 4px;
          border-radius: 4px;
          cursor: pointer;
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background-color: #e2e8f0;
          color: var(--text-color);
        }

        .action-btn.pinned {
          color: #4F46E5;
          opacity: 1;
        }

        .action-btn.delete:hover {
          background-color: #fee2e2;
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .chat-actions {
            opacity: 1; /* Always show actions on mobile */
          }
        }

        .user-profile {
          margin-top: auto;
          padding: 1rem;
          border-radius: 12px;
          background-color: rgba(0,0,0,0.03);
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-color);
        }
        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-info {
          flex: 1;
          overflow: hidden;
        }
        .profile-name {
          font-weight: bold;
          font-size: 0.9rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: var(--text-color);
        }
        .profile-email {
          font-size: 0.75rem;
          color: var(--text-light);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          padding: 5px;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          height: 100vh;
          width: 100%;
        }
        .mobile-overlay {
          display: none;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          .mobile-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background-color: #FFFFFF;
            border-bottom: 1px solid var(--border-color);
            z-index: 40;
          }
          .hamburger-btn {
            background: none;
            border: none;
            padding: 5px;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mobile-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 45;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: #FFFFFF;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            height: calc(100vh - 60px); /* Adjust for top bar */
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
