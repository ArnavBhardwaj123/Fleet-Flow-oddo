import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just bypass
        navigate('/');
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#f8fafc'
        }}>
            <div className="login-card" style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                width: '100%',
                maxWdith: '400px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src="/ChatGPT Image Feb 21, 2026, 11_17_22 AM.png" alt="Logo" style={{ width: '150px', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>Create Account</h2>
                    <p style={{ color: '#64748b' }}>Join Fleet Flow today</p>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: '600', color: '#475569' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: '600', color: '#475569' }}>Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: '600', color: '#475569' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <button type="submit" className="action-btn primary" style={{ width: '100%', marginTop: '1rem' }}>Get Started</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
                    Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
