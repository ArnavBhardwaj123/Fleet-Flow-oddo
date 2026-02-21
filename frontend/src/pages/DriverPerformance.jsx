import React from 'react';

const DriverPerformance = ({ drivers }) => {
    return (
        <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
            {/* Header for Performance */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Driver Proficiency & Safety Assessment</h2>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-muted))' }}>Behavioral metrics and compliance reporting</p>
            </div>

            {/* mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Active Pilots</h3>
                        <p className="card-value">{drivers.length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Safety Avg.</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--success))' }}>92.4%</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--warning) / 0.1)', color: 'hsl(var(--warning))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>License Alerts</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--warning))' }}>2</p>
                    </div>
                </div>
            </div>

            <div className="trips-section">
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Driver Honor Roll & Safety Scorecard</h2>
                    <button className="filter-btn">Analytics Deep Dive</button>
                </div>
                <table className="trips-table">
                    <thead>
                        <tr>
                            <th>Commander Name</th>
                            <th>Credential ID</th>
                            <th>Expiry Status</th>
                            <th>Efficiency</th>
                            <th>Safety Rating</th>
                            <th style={{ textAlign: 'right' }}>Incidents</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            const isExpired = new Date(driver.expiryDate) < new Date();
                            return (
                                <tr key={driver.id} className="table-row-hover">
                                    <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>{driver.name}</td>
                                    <td style={{ fontWeight: '600' }}>{driver.licenseNumber}</td>
                                    <td>
                                        <span style={{
                                            color: isExpired ? 'hsl(var(--danger))' : 'hsl(var(--text-muted))',
                                            fontWeight: isExpired ? '900' : '700',
                                            fontSize: '0.85rem'
                                        }}>
                                            {driver.expiryDate} {isExpired && ' (EXPIRED)'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>{driver.completionRate}%</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                flex: 1,
                                                height: '8px',
                                                background: 'hsl(var(--border) / 0.3)',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                minWidth: '80px',
                                                border: '1px solid hsl(var(--border) / 0.2)'
                                            }}>
                                                <div style={{
                                                    width: `${driver.safetyScore}%`,
                                                    height: '100%',
                                                    background: driver.safetyScore > 85 ? 'hsl(var(--success))' : driver.safetyScore > 70 ? 'hsl(var(--warning))' : 'hsl(var(--danger))',
                                                    borderRadius: '10px'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '900', color: 'hsl(var(--text-main))' }}>{driver.safetyScore}</span>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`status-badge ${driver.complaints > 0 ? 'status-issue' : 'status-done'}`} style={{ fontWeight: '900', fontSize: '0.8rem' }}>
                                            {driver.complaints === 0 ? 'PRISTINE' : `${driver.complaints} ALERTS`}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {drivers.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '3.5rem', color: 'hsl(var(--text-muted))', fontWeight: '700' }}>
                                    No personnel records available.
                                </td>
                            </tr>
                        )}
                        {[1, 2].map(i => (
                            <tr key={`placeholder-${i}`} className="table-row-hover">
                                <td colSpan="6"><div className="dot" style={{ margin: '0' }}></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DriverPerformance;
