import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardOverview = ({ vehiclesCount, maintenanceCount, trips, searchQuery }) => {
  const navigate = useNavigate();

  const filteredTrips = trips.filter(trip =>
    trip.id.toString().includes(searchQuery) ||
    trip.driver_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.vehicle_plate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Fleet Overview</h2>
        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-muted))' }}>Real-time summary of your operations</p>
      </div>

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
            <p className="card-value" style={{ color: 'hsl(var(--success))' }}>20</p>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: '1.25rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Recent Activities</h2>
          <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>Latest trip dispatches and arrivals</p>
        </div>
        <button
          onClick={() => navigate('/trip-dispatcher')}
          style={{
            fontSize: '0.875rem',
            fontWeight: '700',
            color: 'hsl(var(--primary))',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0'
          }}
        >
          View all trips →
        </button>
      </div>

      <div className="trips-section">
        <table className="trips-table">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Vehicle Descriptor</th>
              <th>Assigned Driver</th>
              <th>Live Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.length > 0 ? (
              filteredTrips.slice(0, 5).map((trip) => (
                <tr key={trip.id} className="table-row-hover">
                  <td style={{ fontWeight: '700' }}>#TRP-{String(trip.id).padStart(4, '0')}</td>
                  <td style={{ color: 'hsl(var(--text-muted))' }}>{trip.vehicle_plate || '—'}</td>
                  <td style={{ fontWeight: '600' }}>{trip.driver_name || '—'}</td>
                  <td>
                    <span className={`status-badge status-${trip.status.toLowerCase().replace(' ', '-')}`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: 'hsl(var(--text-muted))' }}>
                  {searchQuery ? 'No trips match your search.' : 'No recent trips found.'}
                </td>
              </tr>
            )}
            {filteredTrips.length < 5 && Array.from({ length: 5 - filteredTrips.length }).map((_, i) => (
              <tr key={`placeholder-${i}`} className="table-row-hover">
                <td colSpan="4"><div className="dot" style={{ margin: '0' }}></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardOverview;
