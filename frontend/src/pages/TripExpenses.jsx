import React from 'react';

const TripExpenses = ({ expenses }) => {
    return (
        <section className="registry-section" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
            {/* Header for Expenses */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Financial Outlays & Fuel Ledger</h2>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-muted))' }}>Detailed breakdown of trip-wise expenditures</p>
            </div>

            {/* mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--primary-light))', color: 'hsl(var(--primary))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Total Outstanding</h3>
                        <p className="card-value">₹ 14,240</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--danger) / 0.1)', color: 'hsl(var(--danger))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Fuel Burn (Agg.)</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--danger))' }}>₹ 9,120</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <div className="card-info">
                        <h3>Settled Trips</h3>
                        <p className="card-value" style={{ color: 'hsl(var(--success))' }}>12</p>
                    </div>
                </div>
            </div>

            <div className="trips-section">
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'hsl(var(--text-main))', margin: 0 }}>Expenditure Audit</h2>
                    <button className="filter-btn">Detailed Report</button>
                </div>
                <table className="trips-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Entry ID</th>
                            <th>Pilot / Driver</th>
                            <th>Total Logged KM</th>
                            <th>Fuel Expenditure</th>
                            <th>Incidental Costs</th>
                            <th style={{ textAlign: 'right' }}>Audit Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="table-row-hover">
                                <td style={{ color: 'hsl(var(--text-muted))', fontWeight: '700', fontSize: '0.8rem' }}>#{expense.tripId}</td>
                                <td style={{ fontWeight: '800', color: 'hsl(var(--text-main))' }}>{expense.driver}</td>
                                <td style={{ fontWeight: '700' }}>{expense.distance} <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))' }}>KM</span></td>
                                <td style={{ color: 'hsl(var(--danger))', fontWeight: '800' }}>₹ {expense.fuelExpense}</td>
                                <td style={{ color: 'hsl(var(--text-muted))', fontWeight: '600' }}>₹ {expense.miscExpense}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <span className={`status-badge ${expense.status === 'Done' ? 'status-done' : 'status-issue'}`} style={{ fontSize: '0.7rem' }}>
                                        {expense.status === 'Done' ? 'SETTLED' : 'PENDING REVIEW'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '3.5rem', color: 'hsl(var(--text-muted))', fontWeight: '700' }}>
                                    No expenditure records found for the current cycle.
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

export default TripExpenses;
