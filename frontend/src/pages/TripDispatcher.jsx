import React, { useState } from 'react';
import './TripDispatcher.css';

const TripDispatcher = ({ onNavigate, isSidebarOpen, toggleSidebar }) => {
    const [trips, setTrips] = useState([
        {
            id: 1,
            tripId: 'TR-001',
            fleetType: 'Trailer Truck',
            origin: 'Mumbai',
            destination: 'Pune',
            status: 'On Trip',
            driver: 'John Doe',
            vehicle: 'MH-01-AB-1234'
        },
        {
            id: 2,
            tripId: 'TR-002',
            fleetType: 'Delivery Van',
            origin: 'Delhi',
            destination: 'Gurgaon',
            status: 'Pending',
            driver: '-',
            vehicle: 'DL-05-CD-5678'
        }
    ]);

    const [formData, setFormData] = useState({
        vehicle: '',
        cargoWeight: '',
        driver: '',
        originAddress: '',
        destination: '',
        estimatedFuelCost: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showForm, setShowForm] = useState(false);

    // Mock data for dropdowns
    const vehicles = [
        { id: 1, name: 'Trailer Truck - MH-01-AB-1234', capacity: 5000 },
        { id: 2, name: 'Delivery Van - DL-05-CD-5678', capacity: 1000 },
        { id: 3, name: 'Container Truck - KA-03-EF-9012', capacity: 8000 },
        { id: 4, name: 'Pickup - AP-07-GH-3456', capacity: 500 }
    ];

    const drivers = [
        { id: 1, name: 'John Doe', phone: '9876543210', status: 'Available' },
        { id: 2, name: 'Ahmed Khan', phone: '9765432109', status: 'Available' },
        { id: 3, name: 'Rajesh Singh', phone: '9654321098', status: 'On Duty' },
        { id: 4, name: 'Priya Sharma', phone: '9543210987', status: 'Available' }
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate cargo weight
    const validateCargoWeight = () => {
        const selectedVehicle = vehicles.find(v => v.id === parseInt(formData.vehicle));
        const weight = parseInt(formData.cargoWeight);

        if (selectedVehicle && weight > selectedVehicle.capacity) {
            alert(`❌ Too Heavy! Maximum capacity: ${selectedVehicle.capacity}kg`);
            return false;
        }
        return true;
    };

    // Submit new trip
    const handleSubmitTrip = (e) => {
        e.preventDefault();

        if (!formData.vehicle || !formData.cargoWeight || !formData.driver || 
            !formData.originAddress || !formData.destination || !formData.estimatedFuelCost) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateCargoWeight()) {
            return;
        }

        const selectedVehicle = vehicles.find(v => v.id === parseInt(formData.vehicle));
        const selectedDriver = drivers.find(d => d.id === parseInt(formData.driver));

        const newTrip = {
            id: trips.length + 1,
            tripId: `TR-${String(trips.length + 1).padStart(3, '0')}`,
            fleetType: selectedVehicle.name.split(' - ')[0],
            origin: formData.originAddress,
            destination: formData.destination,
            status: 'Confirmed',
            driver: selectedDriver.name,
            vehicle: selectedVehicle.name.split(' - ')[1],
            cargoWeight: formData.cargoWeight,
            fuelCost: formData.estimatedFuelCost
        };

        setTrips([...trips, newTrip]);
        setFormData({
            vehicle: '',
            cargoWeight: '',
            driver: '',
            originAddress: '',
            destination: '',
            estimatedFuelCost: ''
        });

        alert('✅ Trip Created Successfully!');
        setShowForm(false);
    };

    // Filter trips
    const filteredTrips = trips.filter(trip => {
        const matchesSearch = trip.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || trip.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={`dispatcher-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/ChatGPT Image Feb 21, 2026, 11_17_22 AM.png" alt="Fleet Flow Logo" className="site-logo" />
                </div>
                <nav className="nav-menu">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        <span className="nav-text">Dashboard</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        <span className="nav-text">Vehicle Registry</span>
                    </a>
                    <a href="#" className="nav-item active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8 4h-4" /></svg>
                        <span className="nav-text">Trip Dispatcher</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
                        <span className="nav-text">Maintenance</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <span className="nav-text">Trip & Expense</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                        <span className="nav-text">Performance</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        <span className="nav-text">Analytics</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dispatcher-main">
                <header className="dispatcher-header">
                    <div className="header-left">
                        <button className="hamburger-btn" onClick={toggleSidebar}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        </button>
                        <div className="search-bar-container">
                            <input 
                                type="text" 
                                placeholder="Search trips..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="header-filters">
                                <button className="filter-btn">Group by</button>
                                <button className="filter-btn" onClick={() => setFilterStatus('All')}>
                                    All Trips
                                </button>
                                <button className="filter-btn" onClick={() => setFilterStatus('On Trip')}>
                                    Active
                                </button>
                                <button className="filter-btn" onClick={() => setFilterStatus('Pending')}>
                                    Pending
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn primary" onClick={() => setShowForm(!showForm)}>
                            ➕ Create New Trip
                        </button>
                        <button className="action-btn primary">📊 Report</button>
                        <button className="action-btn secondary">⚙️ Settings</button>
                        <div className="profile-circle"></div>
                    </div>
                </header>

                <div className="dispatcher-content">
                    {/* Left Section - Trips Table */}
                    <section className={`trips-management ${showForm ? 'form-open' : 'form-closed'}`}>
                        <h2 className="section-title">Active Trips & Fleet Management</h2>
                        <div className="trips-wrapper">
                            <table className="dispatcher-table">
                                <thead>
                                    <tr>
                                        <th>Trip ID</th>
                                        <th>Fleet Type</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                        <th>Driver</th>
                                        <th>Vehicle</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTrips.length > 0 ? (
                                        filteredTrips.map((trip) => (
                                            <tr key={trip.id}>
                                                <td className="trip-id">{trip.tripId}</td>
                                                <td>{trip.fleetType}</td>
                                                <td className="origin-dest">{trip.origin}</td>
                                                <td className="origin-dest">{trip.destination}</td>
                                                <td>{trip.driver}</td>
                                                <td className="vehicle-code">{trip.vehicle}</td>
                                                <td>
                                                    <span className={`status-badge status-${trip.status.toLowerCase().replace(' ', '-')}`}>
                                                        {trip.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="no-data">No trips found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Right Section - New Trip Form (Modal) */}
                    {showForm && (
                        <section className="new-trip-form-section modal-form">
                            <div className="form-header">
                                <h2 className="section-title">Create New Trip</h2>
                                <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
                            </div>
                            <div className="form-card">
                            <form onSubmit={handleSubmitTrip} className="new-trip-form">
                                <div className="form-group">
                                    <label htmlFor="vehicle">Select Vehicle *</label>
                                    <select 
                                        name="vehicle" 
                                        value={formData.vehicle}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="">Choose a vehicle...</option>
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.id}>
                                                {v.name} (Capacity: {v.capacity}kg)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cargoWeight">Cargo Weight (Kg) *</label>
                                    <input 
                                        type="number" 
                                        name="cargoWeight"
                                        placeholder="Enter weight..." 
                                        value={formData.cargoWeight}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        max="10000"
                                        min="1"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="driver">Select Driver *</label>
                                    <select 
                                        name="driver" 
                                        value={formData.driver}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="">Choose a driver...</option>
                                        {drivers.map(d => (
                                            <option key={d.id} value={d.id} disabled={d.status !== 'Available'}>
                                                {d.name} {d.status !== 'Available' ? '(On Duty)' : '(Available)'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="originAddress">Origin Address *</label>
                                    <input 
                                        type="text" 
                                        name="originAddress"
                                        placeholder="Enter pickup location..." 
                                        value={formData.originAddress}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="destination">Destination *</label>
                                    <input 
                                        type="text" 
                                        name="destination"
                                        placeholder="Enter delivery location..." 
                                        value={formData.destination}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="estimatedFuelCost">Estimated Fuel Cost (₹) *</label>
                                    <input 
                                        type="number" 
                                        name="estimatedFuelCost"
                                        placeholder="Enter fuel cost estimate..." 
                                        value={formData.estimatedFuelCost}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        min="1"
                                    />
                                </div>

                                <button type="submit" className="submit-btn">
                                    ✓ Confirm & Dispatch Trip
                                </button>
                            </form>
                        </div>
                    </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TripDispatcher;
