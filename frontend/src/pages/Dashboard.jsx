import React, { useState } from 'react';

const Dashboard = ({ onNavigate, isSidebarOpen = true, toggleSidebar = () => {} }) => {

    return (
        <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/ChatGPT Image Feb 21, 2026, 11_17_22 AM.png" alt="Fleet Flow Logo" className="site-logo" />
                </div>
                <nav className="nav-menu">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="nav-item active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        <span className="nav-text">Dashboard</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        <span className="nav-text">Vehicle Registry</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('trip-dispatcher'); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8 4h-4" /></svg>
                        <span className="nav-text">Trip Dispatcher</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
                        <span className="nav-text">Maintenance</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <span className="nav-text">Trip & Expense</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                        <span className="nav-text">Performance</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        <span className="nav-text">Analytics</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
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
                        <button className="action-btn primary" onClick={() => onNavigate('trip-dispatcher')}>New Trip</button>
                        <button className="action-btn secondary">New Vehicle</button>
                        <div className="profile-circle"></div>
                    </div>
                </header>

                <section className="summary-cards">
                    <div className="card active-fleet">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        </div>
                        <div className="card-info">
                            <h3>Active Fleet</h3>
                            <p className="card-value">220</p>
                        </div>
                    </div>
                    <div className="card maintenance-alert">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
                        </div>
                        <div className="card-info">
                            <h3>Maintenance</h3>
                            <p className="card-value">180</p>
                        </div>
                    </div>
                    <div className="card pending-cargo">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                        </div>
                        <div className="card-info">
                            <h3>Pending Cargo</h3>
                            <p className="card-value">20</p>
                        </div>
                    </div>
                </section>

                <section className="trips-section">
                    <table className="trips-table">
                        <thead>
                            <tr>
                                <th>Trip</th>
                                <th>Vehicle</th>
                                <th>Driver</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>xxxxxxxxxxxxxxx</td>
                                <td>John Doe</td>
                                <td><span className="status on-trip">On Trip</span></td>
                            </tr>
                            {/* Add more rows as needed */}
                            {[2, 3, 4, 5].map((i) => (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>•••••••••••••••</td>
                                    <td>—</td>
                                    <td><div className="dot"></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
