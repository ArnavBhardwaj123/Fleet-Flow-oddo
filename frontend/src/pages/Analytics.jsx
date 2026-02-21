import React from 'react';

const Analytics = () => {
    // Mock data for the charts and table
    const financialData = [
        { month: 'Jan 2026', revenue: '17,42,000', fuelCost: '6,12,000', maintenance: '2,10,000', netProfit: '9,20,000' },
        { month: 'Feb 2026', revenue: '18,90,000', fuelCost: '6,25,000', maintenance: '2,40,000', netProfit: '10,25,000' },
    ];

    return (
        <div className="analytics-container">
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Operational & Financial Analytics</h2>
                <p style={{ fontSize: '0.95rem', color: 'hsl(var(--text-muted))' }}>Comprehensive insights into fleet performance and profitability</p>
            </div>

            {/* Top Summary Cards */}
            <section className="summary-cards" style={{ marginBottom: '2rem' }}>
                <div className="card" style={{ borderLeft: '6px solid hsl(var(--primary))' }}>
                    <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Total Fuel Expenditure</h3>
                        <p className="card-value">₹ 2.64 L</p>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid hsl(var(--success))' }}>
                    <div className="card-icon" style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Fleet ROI Trend</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--success))' }}>+ 12.8%</p>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid hsl(var(--accent))' }}>
                    <div className="card-icon" style={{ background: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--accent))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Fleet Utilization</h3>
                        <p className="card-value">84.2%</p>
                    </div>
                </div>
            </section>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="registry-section" style={{ padding: '2rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800', color: 'hsl(var(--text-main))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'hsl(var(--primary))' }}></div>
                        Fuel Efficiency Trend (km/L)
                    </h4>
                    <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Gridlines */}
                            {[0, 50, 100, 150].map(y => (
                                <line key={y} x1="40" y1={y + 20} x2="380" y2={y + 20} stroke="hsl(var(--border) / 0.5)" strokeWidth="1" strokeDasharray="4" />
                            ))}

                            {/* Area Fill */}
                            <path d="M40 160 L100 110 L160 70 L220 120 L280 80 L340 40 L340 180 L40 180 Z" fill="url(#chartGradient)" />

                            {/* Trend Line */}
                            <path d="M40 160 L100 110 L160 70 L220 120 L280 80 L340 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            {[
                                { x: 40, y: 160 }, { x: 100, y: 110 }, { x: 160, y: 70 },
                                { x: 220, y: 120 }, { x: 280, y: 80 }, { x: 340, y: 40 }
                            ].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="hsl(var(--primary))" strokeWidth="2" />
                            ))}

                            {/* Labels */}
                            <text x="40" y="195" fontSize="11" fontWeight="600" fill="hsl(var(--text-muted))">JAN</text>
                            <text x="340" y="195" fontSize="11" fontWeight="600" fill="hsl(var(--text-muted))">DEC</text>
                        </svg>
                    </div>
                </div>

                <div className="registry-section" style={{ padding: '2rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800', color: 'hsl(var(--text-main))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'hsl(var(--secondary))' }}></div>
                        Expense Distribution by Vehicle Class
                    </h4>
                    <div style={{ height: '240px', width: '100%' }}>
                        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            {/* Bars with premium look */}
                            {[
                                { class: 'L-HCV', val: 140, color: 'hsl(var(--secondary))' },
                                { class: 'M-HCV', val: 100, color: 'hsl(var(--primary))' },
                                { class: 'LCV', val: 120, color: 'hsl(var(--primary-dark))' },
                                { class: 'SCV', val: 70, color: 'hsl(var(--accent))' },
                                { class: 'PICKUP', val: 40, color: 'hsl(var(--text-muted))' }
                            ].map((bar, i) => (
                                <g key={i}>
                                    <rect x={20 + i * 35} y={180 - bar.val} width="22" height={bar.val} fill={bar.color} rx="6" />
                                    <text x={20 + i * 35 + 11} y="195" fontSize="9" fontWeight="700" textAnchor="middle" fill="hsl(var(--text-muted))">{bar.class}</text>
                                </g>
                            ))}
                            <line x1="10" y1="180" x2="190" y2="180" stroke="hsl(var(--border))" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Financial Summary Table */}
            <div className="registry-section">
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Monthly Performance Ledger</h3>
                    <div style={{ padding: '0.4rem 1rem', borderRadius: '100px', background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))', fontSize: '0.75rem', fontWeight: '800' }}>
                        FY 2025-26
                    </div>
                </div>

                <div className="trips-section" style={{ border: 'none', boxShadow: 'none' }}>
                    <table className="trips-table">
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Gross Revenue</th>
                                <th>Fuel Burn</th>
                                <th>Service Cost</th>
                                <th>Operating Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((row, idx) => (
                                <tr key={idx} className="table-row-hover">
                                    <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>{row.month}</td>
                                    <td style={{ fontWeight: '700' }}>₹ {row.revenue}</td>
                                    <td style={{ color: 'hsl(var(--danger))', fontWeight: '700' }}>- ₹ {row.fuelCost}</td>
                                    <td style={{ color: 'hsl(var(--warning))', fontWeight: '700' }}>- ₹ {row.maintenance}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: 'hsl(var(--success))', fontWeight: '900', fontSize: '1rem' }}>₹ {row.netProfit}</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--success))' }}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {[1, 2].map(i => (
                                <tr key={`placeholder-${i}`} className="table-row-hover">
                                    <td colSpan="5"><div className="dot" style={{ margin: '0' }}></div></td>
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
