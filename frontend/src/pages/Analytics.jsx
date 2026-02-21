import React from 'react';

const Analytics = () => {
    // Mock data for the charts and table
    const financialData = [
        { month: 'Jan', revenue: '17L', fuelCost: '6L', maintenance: '2L', netProfit: '9L' },
        { month: 'Feb', revenue: '18L', fuelCost: '6.2L', maintenance: '2.5L', netProfit: '9.3L' },
    ];

    return (
        <div className="analytics-container" style={{ padding: '0.5rem' }}>
            <div className="registry-header">
                <h2>Operational Analytics & Financial Reports</h2>
            </div>

            {/* Top Summary Cards */}
            <div className="summary-cards" style={{ marginBottom: '2rem' }}>
                <div className="summary-card" style={{ border: '2px solid #10b981', background: '#f0fdf4' }}>
                    <h3 style={{ color: '#065f46' }}>Total Fuel Cost</h3>
                    <p className="summary-value" style={{ color: '#059669' }}>Rs. 2.6 L</p>
                </div>
                <div className="summary-card" style={{ border: '2px solid #10b981', background: '#f0fdf4' }}>
                    <h3 style={{ color: '#065f46' }}>Fleet ROI</h3>
                    <p className="summary-value" style={{ color: '#059669' }}>+ 12.5%</p>
                </div>
                <div className="summary-card" style={{ border: '2px solid #10b981', background: '#f0fdf4' }}>
                    <h3 style={{ color: '#065f46' }}>Utilization Rate</h3>
                    <p className="summary-value" style={{ color: '#059669' }}>82%</p>
                </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className="card-ui" style={{ padding: '1.5rem', background: '#fdfbf7', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Fuel Efficiency Trend (km/L)</h4>
                    <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                            {/* Grid Lines */}
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="40" y1="180" x2="380" y2="180" stroke="#e2e8f0" strokeWidth="1" />

                            {/* Trend Line 1 */}
                            <path d="M40 160 L100 120 L160 80 L220 130 L280 90 L340 50" fill="none" stroke="#475569" strokeWidth="2" />
                            <circle cx="40" cy="160" r="3" fill="#475569" />
                            <circle cx="100" cy="120" r="3" fill="#475569" />
                            <circle cx="160" cy="80" r="3" fill="#475569" />
                            <circle cx="220" cy="130" r="3" fill="#475569" />
                            <circle cx="280" cy="90" r="3" fill="#475569" />
                            <circle cx="340" cy="50" r="3" fill="#475569" />

                            {/* Trend Line 2 */}
                            <path d="M40 140 L100 150 L160 110 L220 140 L280 110 L340 70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />

                            {/* Labels */}
                            <text x="40" y="195" fontSize="10" fill="#64748b">Jan</text>
                            <text x="340" y="195" fontSize="10" fill="#64748b">Dec</text>
                        </svg>
                    </div>
                </div>

                <div className="card-ui" style={{ padding: '1.5rem', background: '#fdfbf7', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Top 5 Costliest Vehicles</h4>
                    <div style={{ height: '200px', width: '100%' }}>
                        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                            {/* Bars */}
                            <rect x="20" y="150" width="20" height="30" fill="#cbd5e1" rx="2" />
                            <rect x="55" y="140" width="20" height="40" fill="#cbd5e1" rx="2" />
                            <rect x="90" y="110" width="20" height="70" fill="#cbd5e1" rx="2" />
                            <rect x="125" y="80" width="20" height="100" fill="#cbd5e1" rx="2" />
                            <rect x="160" y="40" width="20" height="140" fill="#1e293b" rx="2" />

                            {/* Baseline */}
                            <line x1="10" y1="180" x2="190" y2="180" stroke="#e2e8f0" strokeWidth="1" />

                            {/* Labels */}
                            <text x="160" y="195" fontSize="8" fill="#64748b">TRK-01</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Financial Summary Table */}
            <div className="registry-section">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                        border: '1.5px solid #3b82f6',
                        padding: '0.4rem 2rem',
                        borderRadius: '20px',
                        color: '#3b82f6',
                        fontWeight: '700',
                        fontSize: '0.9rem'
                    }}>
                        Financial Summary of Month
                    </div>
                </div>

                <div className="trips-section">
                    <table className="trips-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Revenue</th>
                                <th>Fuel Cost</th>
                                <th>Maintenance</th>
                                <th>Net Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((row, idx) => (
                                <tr key={idx} className="table-row-hover">
                                    <td style={{ fontWeight: '700', color: '#0f172a' }}>{row.month}</td>
                                    <td style={{ fontWeight: '600' }}>Rs. {row.revenue}</td>
                                    <td style={{ color: '#ef4444', fontWeight: '600' }}>Rs. {row.fuelCost}</td>
                                    <td style={{ color: '#f97316', fontWeight: '600' }}>Rs. {row.maintenance}</td>
                                    <td style={{ color: '#10b981', fontWeight: '800' }}>Rs. {row.netProfit}</td>
                                </tr>
                            ))}
                            {/* Placeholder dots */}
                            {[1, 2, 3, 4].map(i => (
                                <tr key={`placeholder-${i}`}>
                                    <td colSpan="5"><div className="dot"></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
