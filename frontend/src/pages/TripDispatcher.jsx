import React, { useState } from 'react';
import api from '../api';
import './TripDispatcher.css';

const TripDispatcher = ({ showForm, setShowForm, trips, vehicles, drivers, onTripCreated, searchQuery }) => {
    const [formData, setFormData] = useState({
        vehicle: '',
        cargoWeight: '',
        driver: '',
        originAddress: '',
        destination: '',
        estimatedFuelCost: ''
    });

    const [filterStatus] = useState('All');

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

        if (selectedVehicle && selectedVehicle.capacity && weight > parseInt(selectedVehicle.capacity)) {
            alert(`❌ Too Heavy! Maximum capacity: ${selectedVehicle.capacity}kg`);
            return false;
        }
        return true;
    };

    // Submit new trip
    const handleSubmitTrip = async (e) => {
        e.preventDefault();

        if (!formData.vehicle || !formData.cargoWeight || !formData.driver ||
            !formData.originAddress || !formData.destination || !formData.estimatedFuelCost) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateCargoWeight()) {
            return;
        }

        try {
            await api.post('/management/trips/', {
                vehicle: parseInt(formData.vehicle),
                driver: parseInt(formData.driver),
                start_location: formData.originAddress,
                end_location: formData.destination,
                status: 'Planned'
            });

            // We also need to create an expense entry for this trip if we want to track estimated fuel cost
            // But the backend Trip model doesn't have fuel cost. Expense does.
            // For now, let's just create the trip and refresh.

            onTripCreated();
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
        } catch (err) {
            console.error("Error creating trip:", err);
            alert("Failed to create trip.");
        }
    };

    // Filter trips
    const filteredTrips = trips.filter(trip => {
        const matchesSearch = trip.id.toString().includes(searchQuery) ||
            (trip.driver_name && trip.driver_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (trip.vehicle_plate && trip.vehicle_plate.toLowerCase().includes(searchQuery.toLowerCase()));
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
                                        <td className="trip-id">TR-{String(trip.id).padStart(3, '0')}</td>
                                        <td>{trip.fleet_type}</td>
                                        <td className="origin-dest">{trip.start_location}</td>
                                        <td className="origin-dest">{trip.end_location}</td>
                                        <td>{trip.driver_name}</td>
                                        <td className="vehicle-code">{trip.vehicle_plate}</td>
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
                                            {v.plate} - {v.model} (Cap: {v.capacity}kg)
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
                                        <option key={d.id} value={d.id}>
                                            {d.name}
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
