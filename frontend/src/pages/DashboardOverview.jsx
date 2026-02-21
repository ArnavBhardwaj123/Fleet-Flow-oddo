import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardOverview = ({ vehiclesCount, maintenanceCount }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="summary-cards">
        <div className="card active-fleet" onClick={() => navigate('/vehicle-registry')} style={{ cursor: 'pointer' }}>
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
          </div>
          <div className="card-info">
            <h3>Active Fleet</h3>
            <p className="card-value">{vehiclesCount}</p>
          </div>
        </div>
        <div className="card maintenance-alert" onClick={() => navigate('/maintenance-logs')} style={{ cursor: 'pointer' }}>
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
          </div>
          <div className="card-info">
            <h3>Maintenance</h3>
            <p className="card-value">{maintenanceCount}</p>
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
    </>
  );
};

export default DashboardOverview;
