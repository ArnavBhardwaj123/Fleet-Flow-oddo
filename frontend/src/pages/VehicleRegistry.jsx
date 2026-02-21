import React from 'react';

const VehicleRegistry = ({ vehicles, onDeleteVehicle }) => {
  return (
    <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Fleet Size</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#0f172a' }}>{vehicles.length}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Operational</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#10b981' }}>{vehicles.filter(v => v.status === 'Idle' || v.status === 'Active').length}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Utilization</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#3b82f6' }}>85%</p>
        </div>
      </div>

      <div className="trips-section" style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Asset Inventory</h2>
        </div>
        <table className="trips-table registry-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>Plate</th>
              <th>Model</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Odometer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, index) => (
              <tr key={v.id} style={{ transition: 'all 0.2s' }} className="table-row-hover">
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600' }}>{index + 1}</span>
                </td>
                <td style={{ color: '#334155', fontWeight: '700' }}>{v.plate}</td>
                <td style={{ color: '#475569' }}>{v.model}</td>
                <td>
                  <span style={{
                    padding: '4px 10px',
                    background: '#f1f5f9',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: '#475569',
                    fontWeight: '600'
                  }}>{v.type}</span>
                </td>
                <td style={{ color: '#64748b' }}>{v.capacity}</td>
                <td style={{ color: '#64748b' }}>{v.odometer} km</td>
                <td>
                  <span className="status" style={{
                    background: v.status === 'Idle' ? '#f0f9ff' : '#ecfdf5',
                    color: v.status === 'Idle' ? '#0369a1' : '#059669',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}>
                    {v.status}
                  </span>
                </td>
                <td><button className="delete-btn" onClick={() => onDeleteVehicle(v.id)} style={{ padding: '8px', width: '32px', height: '32px' }}>×</button></td>
              </tr>
            ))}
            {vehicles.length < 5 && Array.from({ length: 5 - vehicles.length }).map((_, i) => (
              <tr key={`empty-v-${i}`}>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1.5rem', color: '#cbd5e1' }}>
                  <div style={{ width: '8px', height: '8px', background: '#f1f5f9', borderRadius: '50%', margin: '0 auto' }}></div>
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
