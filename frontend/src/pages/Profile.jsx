import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Mock user data
    const user = {
        name: "Arnav Bhardwaj",
        email: "arnav@fleetflow.com",
        role: "Fleet Manager",
        avatar: "/avatar.png"
    };

    return (
        <div className="profile-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#64748b'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>My Profile</h1>
            </div>

            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '3rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
            }}>
                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '32px',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden'
                        }}>
                            <img src={user.avatar} alt="Profile" style={{ width: '80px', height: 'auto' }} />
                        </div>
                        <button style={{
                            position: 'absolute',
                            bottom: '-10px',
                            right: '-10px',
                            background: '#3b82f6',
                            color: 'white',
                            border: '4px solid white',
                            borderRadius: '12px',
                            padding: '0.5rem',
                            cursor: 'pointer'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Full Name</label>
                            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>{user.name}</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Email Address</label>
                            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>{user.email}</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Role</label>
                            <span style={{
                                background: '#eff6ff',
                                color: '#1e40af',
                                padding: '0.5rem 1rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.875rem'
                            }}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                    <button className="action-btn primary" style={{ background: '#0f172a' }}>Save Changes</button>
                    <button className="action-btn secondary">Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
