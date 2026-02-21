import React from 'react';

const VehicleRegistry = ({ vehicles, onDeleteVehicle }) => {
  return (
    <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
      {/* Mini Stats for Registry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
          </div>
          <div className="card-info">
            <h3>Registered Fleet</h3>
            <p className="card-value">{vehicles.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>
          <div className="card-info">
            <h3>Operational Assets</h3>
            <p className="card-value" style={{ color: 'hsl(var(--success))' }}>{vehicles.filter(v => v.status === 'Idle' || v.status === 'Active').length}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
          </div>
          <div className="card-info">
            <h3>Avg Utilization</h3>
            <p className="card-value">85.4%</p>
          </div>
        </div>
      </div>

      <div className="trips-section">
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Asset Inventory Management</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="filter-btn">Export CSV</button>
          </div>
        </div>
        <table className="trips-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th>Registration Plate</th>
              <th>Manufacturer & Model</th>
              <th>Asset Class</th>
              <th>Load Volume</th>
              <th>Odometer Reading</th>
              <th>Operational Status</th>
              <th style={{ textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, index) => (
              <tr key={v.id} className="table-row-hover">
                <td style={{ color: 'hsl(var(--text-muted))', fontWeight: '700', fontSize: '0.75rem' }}>{index + 1}</td>
                <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>{v.plate}</td>
                <td style={{ fontWeight: '600' }}>{v.model}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    background: 'hsl(var(--background))',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    color: 'hsl(var(--text-muted))',
                    fontWeight: '800',
                    border: '1px solid hsl(var(--border) / 0.5)'
                  }}>{v.type}</span>
                </td>
                <td style={{ fontWeight: '600', color: 'hsl(var(--text-muted))' }}>{v.capacity}</td>
                <td style={{ fontWeight: '700', fontSize: '0.9rem' }}>{v.odometer.toLocaleString()} <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))' }}>km</span></td>
                <td>
                  <span className={`status-badge ${v.status === 'Idle' || v.status === 'Active' ? 'status-done' : 'status-issue'}`} style={{ fontSize: '0.7rem' }}>
                    {v.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="delete-btn" onClick={() => onDeleteVehicle(v.id)} style={{ padding: '0.5rem', opacity: '0.7', transition: 'all 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                  </button>
                </td>
              </tr>
            ))}
            {vehicles.length < 3 && Array.from({ length: 3 - vehicles.length }).map((_, i) => (
              <tr key={`empty-v-${i}`} className="table-row-hover">
                <td colSpan="8" style={{ padding: '1.25rem' }}>
                  <div className="dot" style={{ margin: '0' }}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VehicleRegistry;
