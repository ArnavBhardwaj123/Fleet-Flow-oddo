import React from 'react';

const Analytics = ({ analyticsData }) => {
    if (!analyticsData) {
        return (
            <div className="analytics-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="dot" style={{ width: '40px', height: '40px', marginBottom: '1rem' }}></div>
                    <p style={{ color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Aggregating fleet intelligence...</p>
                </div>
            </div>
        );
    }

    const { total_fuel, total_revenue, utilization, expenses_by_class, monthly_performance } = analyticsData;

    // Format numbers for display
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Calculate ROI placeholder logic (Profit / Expenses)
    const totalExpenses = expenses_by_class.reduce((acc, curr) => acc + (parseFloat(curr.total_expense) || 0), 0);
    const roi = totalExpenses > 0 ? ((total_revenue - totalExpenses) / totalExpenses * 100).toFixed(1) : 0;

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
                        <h3>Total Fuel Burn</h3>
                        <p className="card-value">{formatCurrency(total_fuel)}</p>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid hsl(var(--success))' }}>
                    <div className="card-icon" style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Operating ROI</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--success))' }}>{roi}%</p>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid hsl(var(--accent))' }}>
                    <div className="card-icon" style={{ background: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--accent))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Fleet Utilization</h3>
                        <p className="card-value">{utilization}%</p>
                    </div>
                </div>
            </section>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="registry-section" style={{ padding: '2rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800', color: 'hsl(var(--text-main))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'hsl(var(--primary))' }}></div>
                        Gross Revenue Trend (Monthly)
                    </h4>
                    <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                        {monthly_performance.length > 0 ? (
                            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {[0, 50, 100, 150].map(y => (
                                    <line key={y} x1="40" y1={y + 20} x2="380" y2={y + 20} stroke="hsl(var(--border) / 0.5)" strokeWidth="1" strokeDasharray="4" />
                                ))}
                                {/* Simple line chart logic */}
                                <polyline
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="3"
                                    points={monthly_performance.map((m, i) => {
                                        const x = 40 + (i * (340 / Math.max(1, monthly_performance.length - 1)));
                                        const y = 180 - (parseFloat(m.revenue) / (total_revenue || 1) * 140);
                                        return `${x},${y}`;
                                    }).join(' ')}
                                />
                                {monthly_performance.map((m, i) => {
                                    const x = 40 + (i * (340 / Math.max(1, monthly_performance.length - 1)));
                                    const y = 180 - (parseFloat(m.revenue) / (total_revenue || 1) * 140);
                                    return <circle key={i} cx={x} cy={y} r="5" fill="white" stroke="hsl(var(--primary))" strokeWidth="2" />;
                                })}
                                <text x="40" y="195" fontSize="11" fontWeight="600" fill="hsl(var(--text-muted))">START</text>
                                <text x="340" y="195" fontSize="11" fontWeight="600" fill="hsl(var(--text-muted))">END</text>
                            </svg>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--text-muted))' }}>
                                Insufficient data for trend analysis
                            </div>
                        )}
                    </div>
                </div>

                <div className="registry-section" style={{ padding: '2rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800', color: 'hsl(var(--text-main))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'hsl(var(--secondary))' }}></div>
                        Expense Distribution by Vehicle Class
                    </h4>
                    <div style={{ height: '240px', width: '100%' }}>
                        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            {expenses_by_class.length > 0 ? (
                                expenses_by_class.map((bar, i) => {
                                    const height = (parseFloat(bar.total_expense) / (totalExpenses || 1)) * 140;
                                    const color = i === 0 ? 'hsl(var(--secondary))' : i === 1 ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
                                    return (
                                        <g key={i}>
                                            <rect x={20 + i * 35} y={180 - height} width="22" height={height} fill={color} rx="6" />
                                            <text x={20 + i * 35 + 11} y="195" fontSize="9" fontWeight="700" textAnchor="middle" fill="hsl(var(--text-muted))">{bar.vehicle__type}</text>
                                        </g>
                                    );
                                })
                            ) : (
                                <text x="100" y="100" textAnchor="middle" fill="hsl(var(--text-muted))">No expense data yet</text>
                            )}
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
                        Real-time Data
                    </div>
                </div>

                <div className="trips-section" style={{ border: 'none', boxShadow: 'none' }}>
                    <table className="trips-table">
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Gross Revenue</th>
                                <th>Fuel Burn</th>
                                <th>Operating Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthly_performance.length > 0 ? (
                                monthly_performance.map((row, idx) => {
                                    const profit = (parseFloat(row.revenue) || 0) - (parseFloat(row.fuel_burn) || 0);
                                    return (
                                        <tr key={idx} className="table-row-hover">
                                            <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>
                                                {row.month ? new Date(row.month).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Total'}
                                            </td>
                                            <td style={{ fontWeight: '700' }}>{formatCurrency(row.revenue)}</td>
                                            <td style={{ color: 'hsl(var(--danger))', fontWeight: '700' }}>- {formatCurrency(row.fuel_burn)}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ color: 'hsl(var(--success))', fontWeight: '900', fontSize: '1rem' }}>{formatCurrency(profit)}</span>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--success))' }}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--text-muted))' }}>
                                        No performance data recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
