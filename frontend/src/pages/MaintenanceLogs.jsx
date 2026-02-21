import React from 'react';

const MaintenanceLogs = ({ logs }) => {
    return (
        <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Total Records</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#0f172a' }}>{logs.length}</p>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Active Issues</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#f97316' }}>{logs.filter(l => l.status === 'New').length}</p>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Est. Cost</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0 0 0', color: '#2563eb' }}>$1,240</p>
                </div>
            </div>

            <div className="trips-section" style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Maintenance History</h2>
                </div>
                <table className="trips-table registry-table">
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Vehicle</th>
                            <th>Issue/Service</th>
                            <th>Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} style={{ transition: 'all 0.2s' }} className="table-row-hover">
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600' }}>#{log.id}</span>
                                </td>
                                <td style={{ color: '#334155', fontWeight: '700' }}>{log.vehicle}</td>
                                <td style={{ color: '#475569' }}>{log.issue}</td>
                                <td style={{ color: '#64748b' }}>{log.date}</td>
                                <td style={{ fontWeight: '600', color: '#1e293b' }}>{log.cost}</td>
                                <td>
                                    <span className="status" style={{
                                        background: log.status === 'New' ? '#ecfdf5' : '#fef2f2',
                                        color: log.status === 'New' ? '#059669' : '#ef4444',
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.05em',
                                        display: 'inline-block'
                                    }}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {logs.length < 5 && Array.from({ length: 5 - logs.length }).map((_, i) => (
                            <tr key={`empty-m-${i}`}>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#cbd5e1' }}>
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

export default MaintenanceLogs;
