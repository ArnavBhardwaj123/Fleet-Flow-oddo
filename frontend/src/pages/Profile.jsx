import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Profile = ({ onProfileUpdate }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        location: '',
        bio: '',
        designation: '',
        employee_id: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/profile/');
            if (res.data && res.data.length > 0) {
                const data = res.data[0];
                setProfile(data);
                setFormData({
                    username: data.username || '',
                    phone: data.phone || '',
                    location: data.location || '',
                    bio: data.bio || '',
                    designation: data.designation || '',
                    employee_id: data.employee_id || ''
                });
                if (data.profile_pic) {
                    setPreviewUrl(data.profile_pic);
                }
            } else {
                // Handle case where profile doesn't exist yet (though it should be created on register)
                console.log("No profile found.");
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        try {
            if (profile && profile.id) {
                const data = new FormData();
                data.append('username', formData.username);
                data.append('phone', formData.phone);
                data.append('location', formData.location);
                data.append('bio', formData.bio);
                data.append('designation', formData.designation);
                data.append('employee_id', formData.employee_id);
                if (selectedFile) {
                    data.append('profile_pic', selectedFile);
                }

                const res = await api.patch(`/auth/profile/${profile.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProfile(res.data);
                setIsEditing(false);
                setSelectedFile(null); // Clear selected file after successful upload
                if (res.data.profile_pic) {
                    setPreviewUrl(res.data.profile_pic); // Update preview with new image URL from backend
                }
                if (onProfileUpdate) onProfileUpdate();
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Commander Profile...</div>;
    }

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
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src={previewUrl || profile?.profile_pic || "/avatar.png"}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {isEditing && (
                                <label style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '4.5rem 2.5rem 2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    <p style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0, color: 'hsl(var(--text-main))' }}>
                                        {profile?.username || 'Commander'}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Designation</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g. Fleet Manager"
                                    />
                                ) : (
                                    <div style={{ display: 'inline-flex' }}>
                                        <span className="status-badge status-on-trip" style={{ fontWeight: '800' }}>
                                            {profile?.designation || 'Not Set'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Employee ID</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="employee_id"
                                        value={formData.employee_id}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g. FF-8821"
                                    />
                                ) : (
                                    <p style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'hsl(var(--text-muted))' }}>{profile?.employee_id || 'Not Set'}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter phone number"
                                    />
                                ) : (
                                    <p style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'hsl(var(--text-main))' }}>{profile?.phone || 'Not Set'}</p>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <p style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0, color: 'hsl(var(--text-main))' }}>
                                    {profile?.email || 'N/A'}
                                </p>
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g. Mumbai, India"
                                    />
                                ) : (
                                    <p style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0, color: 'hsl(var(--text-main))' }}>{profile?.location || 'Not Set'}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>System Access</label>
                                <span className="status-badge status-done">Full Administrator</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '2rem' }}>
                        <label>Bio</label>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Tell us about yourself"
                                style={{ minHeight: '80px', resize: 'vertical' }}
                            />
                        ) : (
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', margin: 0 }}>{profile?.bio || 'No bio provided'}</p>
                        )}
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid hsl(var(--border) / 0.5)', display: 'flex', gap: '1.25rem' }}>
                        {isEditing ? (
                            <>
                                <button className="action-btn primary" onClick={handleUpdate} style={{ padding: '0.875rem 2rem' }}>
                                    Save Particulars
                                </button>
                                <button className="action-btn secondary" onClick={() => { setIsEditing(false); setPreviewUrl(profile?.profile_pic || "/avatar.png"); setSelectedFile(null); }} style={{ padding: '0.875rem 2rem' }}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button className="action-btn primary" onClick={() => setIsEditing(true)} style={{ padding: '0.875rem 2rem' }}>
                                Update Particulars
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
