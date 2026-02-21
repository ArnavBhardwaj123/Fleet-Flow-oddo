import React from 'react';

const TripExpenses = ({ expenses }) => {
    return (
        <div className="registry-section">
            <div className="registry-header">
                <h2>Expense & Fuel Logging</h2>
            </div>

            <div className="trips-section">
                <table className="trips-table">
                    <thead>
                        <tr>
                            <th>Trip ID</th>
                            <th>Driver</th>
                            <th>Distance</th>
                            <th>Fuel Expense</th>
                            <th>Misc. Expen</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="table-row-hover">
                                <td>{expense.tripId}</td>
                                <td style={{ fontWeight: '600', color: '#0f172a' }}>{expense.driver}</td>
                                <td>{expense.distance} km</td>
                                <td style={{ color: '#ef4444', fontWeight: '700' }}>{expense.fuelExpense}</td>
                                <td style={{ color: '#64748b', fontWeight: '500' }}>{expense.miscExpense}</td>
                                <td>
                                    <span className="status" style={{
                                        background: expense.status === 'Done' ? '#f0fdf4' : '#fff7ed',
                                        color: expense.status === 'Done' ? '#10b981' : '#f97316'
                                    }}>
                                        {expense.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                    No expense records found.
                                </td>
                            </tr>
                        )}
                        {/* Placeholder dots as seen in wireframe */}
                        {[1, 2, 3].map(i => (
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

export default TripExpenses;
