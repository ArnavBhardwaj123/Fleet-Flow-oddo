import React, { useState } from 'react';
import './TripDispatcher.css';

const TripDispatcher = ({ showForm, setShowForm }) => {
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

    const [searchTerm] = useState('');
    const [filterStatus] = useState('All');

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
    );
};

export default TripDispatcher;
