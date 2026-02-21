import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({
  toggleSidebar,
  userProfile,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  children
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const dropdownRef = useRef(null);
  const filtersRef = useRef(null);
  const sortRef = useRef(null);
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
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Quick search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="header-filters">
            <div style={{ position: 'relative' }} ref={filtersRef}>
              <button
                className={`filter-btn ${filterType !== 'All' || filterStatus !== 'All' ? 'active' : ''}`}
                onClick={() => { setShowFilters(!showFilters); setShowSort(false); }}
              >
                Filters
              </button>
              {showFilters && (
                <div className="filter-dropdown" style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  marginTop: '0.5rem',
                  background: 'hsl(var(--surface))',
                  borderRadius: '12px',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '1rem',
                  zIndex: 100,
                  width: '200px'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'hsl(var(--text-muted))', margin: '0 0 0.5rem' }}>Vehicle Type</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {['All', 'Truck', 'Van', 'Mini', 'Trailer'].map(type => (
                        <button
                          key={type}
                          onClick={() => { setFilterType(type); setShowFilters(false); }}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: filterType === type ? 'hsl(var(--primary-light))' : 'transparent',
                            color: filterType === type ? 'hsl(var(--primary))' : 'hsl(var(--text-main))',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {type === 'All' ? 'All Types' : type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'hsl(var(--text-muted))', margin: '0 0 0.5rem' }}>Operational Status</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {['All', 'Idle', 'Active', 'On Trip', 'Issue'].map(status => (
                        <button
                          key={status}
                          onClick={() => { setFilterStatus(status); setShowFilters(false); }}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: filterStatus === status ? 'hsl(var(--success) / 0.1)' : 'transparent',
                            color: filterStatus === status ? 'hsl(var(--success))' : 'hsl(var(--text-main))',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {status === 'All' ? 'All Statuses' : status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }} ref={sortRef}>
              <button
                className={`filter-btn ${sortBy !== 'Default' ? 'active' : ''}`}
                onClick={() => { setShowSort(!showSort); setShowFilters(false); }}
              >
                Sort
              </button>
              {showSort && (
                <div className="filter-dropdown" style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '0.5rem',
                  background: 'hsl(var(--surface))',
                  borderRadius: '12px',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem',
                  zIndex: 100,
                  width: '180px'
                }}>
                  {['Default', 'Plate (A-Z)', 'Plate (Z-A)', 'Odometer (Low-High)', 'Odometer (High-Low)', 'Capacity (High-Low)'].map(option => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setShowSort(false); }}
                      style={{
                        padding: '0.625rem 0.75rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: sortBy === option ? 'hsl(var(--primary-light))' : 'transparent',
                        color: sortBy === option ? 'hsl(var(--primary))' : 'hsl(var(--text-main))',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-actions">
        {children}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            className="profile-circle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={userProfile?.profile_pic || "/avatar.png"} alt="Profile" />
          </div>

          {showDropdown && (
            <div className="profile-dropdown" style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: '0',
              background: 'hsl(var(--surface))',
              borderRadius: '16px',
              border: '1px solid hsl(var(--border) / 0.8)',
              boxShadow: 'var(--shadow-lg)',
              width: '220px',
              zIndex: 1000,
              padding: '0.625rem',
              animation: 'slideUp var(--transition-fast)'
            }}>
              <div style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: 'hsl(var(--text-main))' }}>
                  {userProfile?.username || 'Commander'}
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                  {userProfile?.designation || 'Fleet Manager'}
                </p>
              </div>

              <div style={{ height: '1px', background: 'hsl(var(--border) / 0.5)', margin: '0 0.5rem 0.5rem' }}></div>

              <button
                onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                className="dropdown-item"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'hsl(var(--text-muted))',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="dropdown-item"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'hsl(var(--danger))',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all var(--transition-fast)',
                  marginTop: '0.25rem'
                }}
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
