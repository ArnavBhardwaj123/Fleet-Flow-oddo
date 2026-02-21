import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Mock user data
    const user = {
        name: "Arnav Bhardwaj",
        email: "arnav@fleetflow.com",
        role: "Fleet Manager",
        avatar: "/avatar.png",
        joined: "March 2024",
        employeeId: "FF-8821"
    };

    return (
        <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="hamburger-btn"
                    style={{ padding: '0.625rem' }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'hsl(var(--text-main))', margin: 0 }}>Commander Profile</h1>
            </div>

            <div className="registry-section" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Profile Banner/Header */}
                <div style={{
                    height: '140px',
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px',
                        left: '2.5rem',
                        padding: '6px',
                        background: 'hsl(var(--surface))',
                        borderRadius: '30px',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '24px',
                            background: 'hsl(var(--background))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img src={user.avatar} alt="Profile" style={{ width: '70px', height: 'auto' }} />
                        </div>
                    </div>
                </div>

                <div style={{ padding: '4.5rem 2.5rem 2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <p style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0, color: 'hsl(var(--text-main))' }}>{user.name}</p>
                            </div>

                            <div className="form-group">
                                <label>Designation</label>
                                <div style={{ display: 'inline-flex' }}>
                                    <span className="status-badge status-on-trip" style={{ fontWeight: '800' }}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Employee ID</label>
                                <p style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'hsl(var(--text-muted))' }}>{user.employeeId}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <p style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0, color: 'hsl(var(--text-main))' }}>{user.email}</p>
                            </div>

                            <div className="form-group">
                                <label>Member Since</label>
                                <p style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0, color: 'hsl(var(--text-main))' }}>{user.joined}</p>
                            </div>

                            <div className="form-group">
                                <label>System Access</label>
                                <span className="status-badge status-done">Full Administrator</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid hsl(var(--border) / 0.5)', display: 'flex', gap: '1.25rem' }}>
                        <button className="action-btn primary" style={{ padding: '0.875rem 2rem' }}>
                            Update Particulars
                        </button>
                        <button className="action-btn secondary" style={{ padding: '0.875rem 2rem' }}>
                            Security Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
