import React from 'react';

const DriverPerformance = ({ drivers }) => {
    return (
        <div className="registry-section">
            <div className="registry-header">
                <h2>Driver Performance & Safety Profiles</h2>
            </div>

            <div className="trips-section">
                <table className="trips-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>License#</th>
                            <th>Expiry</th>
                            <th>Completion Rate</th>
                            <th>Safety Score</th>
                            <th>Complaints</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id} className="table-row-hover">
                                <td style={{ fontWeight: '600', color: '#0f172a' }}>{driver.name}</td>
                                <td>{driver.licenseNumber}</td>
                                <td style={{
                                    color: new Date(driver.expiryDate) < new Date() ? '#ef4444' : 'inherit',
                                    fontWeight: new Date(driver.expiryDate) < new Date() ? '700' : '400'
                                }}>
                                    {driver.expiryDate}
                                </td>
                                <td style={{ fontWeight: '600' }}>{driver.completionRate}%</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '6px',
                                            background: '#f1f5f9',
                                            borderRadius: '3px',
                                            overflow: 'hidden',
                                            minWidth: '60px'
                                        }}>
                                            <div style={{
                                                width: `${driver.safetyScore}%`,
                                                height: '100%',
                                                background: driver.safetyScore > 80 ? '#10b981' : driver.safetyScore > 60 ? '#f97316' : '#ef4444'
                                            }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{driver.safetyScore}%</span>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '8px',
                                        background: driver.complaints > 0 ? '#fef2f2' : '#f0fdf4',
                                        color: driver.complaints > 0 ? '#ef4444' : '#10b981',
                                        fontSize: '0.85rem',
                                        fontWeight: '700'
                                    }}>
                                        {driver.complaints}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {drivers.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                    No driver records found.
                                </td>
                            </tr>
                        )}
                        {/* Placeholder dots as seen in wireframe */}
                        {[1, 2, 3, 4, 5, 6, 7].map(i => (
                            <tr key={`placeholder-${i}`}>
                                <td colSpan="6"><div className="dot"></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverPerformance;
