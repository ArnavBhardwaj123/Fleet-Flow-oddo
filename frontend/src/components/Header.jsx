import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <div className="search-bar-container">
          <input type="text" placeholder="Search bar..." className="search-input" />
          <div className="header-filters">
            <button className="filter-btn">Group by</button>
            <button className="filter-btn">Filter</button>
            <button className="filter-btn">Sort by...</button>
          </div>
        </div>
      </div>
      <div className="header-actions">
        {children}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            className="profile-circle"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              transition: 'transform 0.2s',
              transform: showDropdown ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <img src="/avatar.png" alt="Profile" />
          </div>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '120%',
              right: '0',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              width: '200px',
              zIndex: 1000,
              padding: '0.5rem',
              animation: 'slideInUp 0.2s ease-out'
            }}>
              <button
                onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#0f172a'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#475569'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Profile
              </button>

              <div style={{ margin: '0.5rem 0', borderTop: '1px solid #f1f5f9' }}></div>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.background = '#fef2f2'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
