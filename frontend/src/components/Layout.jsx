import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({
  isSidebarOpen,
  toggleSidebar,
  headerActions,
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
  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar />
      <main className="main-content">
        <Header
          toggleSidebar={toggleSidebar}
          userProfile={userProfile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        >
          {headerActions}
        </Header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
