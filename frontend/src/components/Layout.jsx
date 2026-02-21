import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ isSidebarOpen, toggleSidebar, headerActions, children }) => {
  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar />
      <main className="main-content">
        <Header toggleSidebar={toggleSidebar}>
          {headerActions}
        </Header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
