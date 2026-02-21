import React from 'react';

const Header = ({ toggleSidebar, children }) => {
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
        <div className="profile-circle"></div>
      </div>
    </header>
  );
};

export default Header;
