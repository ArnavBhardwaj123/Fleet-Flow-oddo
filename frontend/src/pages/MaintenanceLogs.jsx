import React from 'react';

const MaintenanceLogs = ({ logs }) => {
    return (
        <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
            {/* Header for Maintenance */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Maintenance Ledger</h2>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-muted))' }}>Track and manage all vehicle service history</p>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Total Service Records</h3>
                        <p className="card-value">{logs.length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--warning) / 0.1)', color: 'hsl(var(--warning))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Unresolved Issues</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--warning))' }}>{logs.filter(l => l.status === 'New').length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Estimated Costs</h3>
                        <p className="card-value">₹ 82,400</p>
                    </div>
                </div>
            </div>

            <div className="trips-section">
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>System Log Activity</h2>
                    <button className="filter-btn">Filter Logs</button>
                </div>
                <table className="trips-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Log ID</th>
                            <th>Target Vehicle</th>
                            <th>Description of Issue</th>
                            <th>Log Date</th>
                            <th>Incurred Cost</th>
                            <th style={{ textAlign: 'right' }}>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="table-row-hover">
                                <td style={{ color: 'hsl(var(--text-muted))', fontWeight: '700', fontSize: '0.8rem' }}>#{log.id}</td>
                                <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>{log.vehicle}</td>
                                <td style={{ fontWeight: '600' }}>{log.issue}</td>
                                <td style={{ color: 'hsl(var(--text-muted))' }}>{log.date}</td>
                                <td style={{ fontWeight: '700' }}>₹ {log.cost}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <span className={`status-badge ${log.status === 'New' ? 'status-issue' : 'status-done'}`} style={{ fontSize: '0.7rem' }}>
                                        {log.status === 'New' ? 'AWAITING REPAIR' : 'RESOLVED'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {logs.length < 3 && Array.from({ length: 3 - logs.length }).map((_, i) => (
                            <tr key={`empty-m-${i}`} className="table-row-hover">
                                <td colSpan="6" style={{ padding: '1.25rem' }}>
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

export default MaintenanceLogs;
