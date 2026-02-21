import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import api from './api'
import Layout from './components/Layout'
import DashboardOverview from './pages/DashboardOverview'
import VehicleRegistry from './pages/VehicleRegistry'
import MaintenanceLogs from './pages/MaintenanceLogs'
import TripDispatcher from './pages/TripDispatcher'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/Profile'
import TripExpenses from './pages/TripExpenses'
import DriverPerformance from './pages/DriverPerformance'
import Analytics from './pages/Analytics'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  // Double-check localStorage on mount/location change to avoid stale state issues
  useEffect(() => {
    const current = localStorage.getItem("isLoggedIn") === "true";
    if (current !== isLoggedIn) {
      setIsLoggedIn(current);
    }
  }, [location.pathname]);
  const [showTripForm, setShowTripForm] = useState(false);

  // Shared State (Persisted in Django Backend)
  const [vehicles, setVehicles] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Default');

  // Handle Login State Changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch Data from Backend (Decoupled to prevent one failure from blocking everything)
  const fetchData = async () => {
    if (!isLoggedIn) return;

    const endpoints = {
      vehicles: '/management/vehicles/',
      maintenance: '/management/maintenance/',
      expenses: '/management/expenses/',
      drivers: '/management/drivers/',
      trips: '/management/trips/',
      profile: '/auth/profile/',
      analytics: '/management/analytics/'
    };

    const setters = {
      vehicles: setVehicles,
      maintenance: setMaintenanceLogs,
      expenses: setExpenses,
      drivers: setDrivers,
      trips: setTrips,
      analytics: setAnalyticsData,
      profile: (data) => {
        if (data && data.length > 0) setUserProfile(data[0]);
      }
    };

    Object.entries(endpoints).forEach(async ([key, url]) => {
      try {
        const res = await api.get(url);
        setters[key](res.data);
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Auth Guard: Redirect unauthenticated users
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    } else if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [isLoggedIn, location.pathname]);

  // Form States
  const [newVehicle, setNewVehicle] = useState({ plate: '', payload: '', odometer: '', type: '', model: '' });
  const [newService, setNewService] = useState({ vehicleName: '', issue: '', date: '' });
  const [newExpense, setNewExpense] = useState({ tripId: '', driver: '', fuelCost: '', miscExpense: '' });
  const [newDriver, setNewDriver] = useState({ name: '', licenseNumber: '', expiryDate: '' });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNewTripClick = () => {
    if (location.pathname !== '/trip-dispatcher') {
      navigate('/trip-dispatcher');
    }
    setShowTripForm(true);
  };

  const handleAddVehicle = async () => {
    if (!newVehicle.plate) return;
    try {
      const res = await api.post('/management/vehicles/', {
        plate: newVehicle.plate,
        model: newVehicle.model,
        type: newVehicle.type,
        capacity: newVehicle.payload,
        odometer: newVehicle.odometer,
        status: 'Idle'
      });
      setVehicles([...vehicles, res.data]);
      setShowVehicleModal(false);
      setNewVehicle({ plate: '', payload: '', odometer: '', type: '', model: '' });
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  const handleAddService = async () => {
    if (!newService.vehicleName) return;
    try {
      const res = await api.post('/management/maintenance/', {
        vehicle: parseInt(newService.vehicleName), // This will be the vehicle ID from dropdown
        issue: newService.issue,
        date: newService.date,
        cost: '0',
        status: 'New'
      });
      // Refresh data to get the vehicle_plate from serializer
      fetchData();
      setShowServiceModal(false);
      setNewService({ vehicleName: '', issue: '', date: '' });
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  const handleAddExpense = async () => {
    if (!newExpense.tripId) return;
    try {
      const res = await api.post('/management/expenses/', {
        trip: parseInt(newExpense.tripId), // This will be the trip ID from dropdown
        fuel_expense: parseFloat(newExpense.fuelCost) || 0,
        misc_expense: parseFloat(newExpense.miscExpense) || 0,
        status: 'Done'
      });
      // Refresh data to get the driver_name from serializer
      fetchData();
      setShowExpenseModal(false);
      setNewExpense({ tripId: '', driver: '', fuelCost: '', miscExpense: '' });
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleAddDriver = async () => {
    if (!newDriver.name) return;
    try {
      const res = await api.post('/management/drivers/', {
        name: newDriver.name,
        license_number: newDriver.licenseNumber,
        expiry_date: newDriver.expiryDate,
        completion_rate: 0,
        safety_score: 100,
        complaints: 0
      });
      setDrivers([...drivers, res.data]);
      setShowDriverModal(false);
      setNewDriver({ name: '', licenseNumber: '', expiryDate: '' });
    } catch (err) {
      console.error("Error adding driver:", err);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await api.delete(`/management/vehicles/${id}/`);
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  const renderHeaderActions = () => {
    const path = location.pathname;

    if (path === '/maintenance-logs') {
      return (
        <button className="action-btn secondary" onClick={() => setShowServiceModal(true)}>
          Create New Service
        </button>
      );
    }

    if (path === '/vehicle-registry' || path === '/') {
      return (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="action-btn secondary" onClick={() => setShowVehicleModal(true)}>
            + New Vehicle
          </button>
          <button className="action-btn primary" onClick={handleNewTripClick}>
            <span style={{ fontSize: '1.2rem', fontWeight: '400', color: '#a78bfa' }}>+</span> New Trip
          </button>
        </div>
      );
    }

    if (path === '/trip-expenses') {
      return (
        <button className="action-btn primary" onClick={() => setShowExpenseModal(true)} style={{ background: 'white', color: '#3b82f6', border: '1.5px solid #3b82f6' }}>
          Add an Expense
        </button>
      );
    }

    if (path === '/driver-performance') {
      return (
        <button className="action-btn primary" onClick={() => setShowDriverModal(true)} style={{ background: 'white', color: '#10b981', border: '1.5px solid #10b981' }}>
          Add a Driver
        </button>
      );
    }

    if (path === '/analytics') {
      return (
        <button className="action-btn primary" style={{ background: '#3b82f6', color: 'white' }}>
          Export Report
        </button>
      );
    }

    if (path === '/profile') {
      return null;
    }

    // Default or Trip Dispatcher
    return (
      <button className="action-btn primary" onClick={() => setShowTripForm(true)}>
        <span style={{ fontSize: '1.2rem', fontWeight: '400', color: '#a78bfa' }}>+</span> New Trip
      </button>
    );
  };

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes (Wrapped in Layout) */}
        <Route path="/*" element={
          isLoggedIn ? (
            <Layout
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              headerActions={renderHeaderActions()}
              userProfile={userProfile}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterType={filterType}
              setFilterType={setFilterType}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
            >
              <Routes>
                <Route path="/" element={
                  <DashboardOverview
                    vehiclesCount={vehicles.length}
                    maintenanceCount={maintenanceLogs.length}
                    trips={trips}
                    searchQuery={searchQuery}
                  />
                } />
                <Route path="/vehicle-registry" element={
                  <VehicleRegistry
                    vehicles={vehicles}
                    onDeleteVehicle={handleDeleteVehicle}
                    searchQuery={searchQuery}
                    filterType={filterType}
                    filterStatus={filterStatus}
                    sortBy={sortBy}
                  />
                } />
                <Route path="/trip-dispatcher" element={
                  <TripDispatcher
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    showForm={showTripForm}
                    setShowForm={setShowTripForm}
                    trips={trips}
                    vehicles={vehicles}
                    drivers={drivers}
                    onTripCreated={fetchData}
                    searchQuery={searchQuery}
                  />
                } />
                <Route path="/maintenance-logs" element={
                  <MaintenanceLogs
                    logs={maintenanceLogs}
                  />
                } />
                <Route path="/trip-expenses" element={
                  <TripExpenses
                    expenses={expenses}
                  />
                } />
                <Route path="/driver-performance" element={
                  <DriverPerformance
                    drivers={drivers}
                  />
                } />
                <Route path="/analytics" element={<Analytics analyticsData={analyticsData} />} />
                <Route path="/profile" element={<Profile onProfileUpdate={fetchData} />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>

      {/* Shared Modals */}
      {showVehicleModal && (
        <div className="modal-overlay">
          <div className="modal-content vehicle-registration-modal">
            <div className="modal-header"><h2>New Vehicle Registration</h2></div>
            <div className="modal-body">
              <div className="form-group"><label>License Plate:</label><input type="text" placeholder="Enter plate" value={newVehicle.plate} onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })} /></div>
              <div className="form-group"><label>Max Payload:</label><input type="text" placeholder="e.g. 5 tonn" value={newVehicle.payload} onChange={(e) => setNewVehicle({ ...newVehicle, payload: e.target.value })} /></div>
              <div className="form-group"><label>Initial Odometer:</label><input type="text" placeholder="e.g. 79000" value={newVehicle.odometer} onChange={(e) => setNewVehicle({ ...newVehicle, odometer: e.target.value })} /></div>
              <div className="form-group"><label>Type:</label><input type="text" placeholder="e.g. Mini" value={newVehicle.type} onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })} /></div>
              <div className="form-group"><label>Model:</label><input type="text" placeholder="e.g. 2017" value={newVehicle.model} onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} /></div>
            </div>
            <div className="modal-footer">
              <button className="save-btn wireframe-green" onClick={handleAddVehicle}>Create</button>
              <button className="cancel-btn wireframe-red" onClick={() => setShowVehicleModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showServiceModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '450px' }}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Log Maintenance</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Record a new service entry for the fleet</p>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle</label>
                <select
                  value={newService.vehicleName}
                  onChange={(e) => setNewService({ ...newService, vehicleName: e.target.value })}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plate} - {v.model}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Issue/Service</label>
                <input type="text" placeholder="e.g. Engine Issue" value={newService.issue} onChange={(e) => setNewService({ ...newService, issue: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Date</label>
                <input type="text" placeholder="e.g. 20/02" value={newService.date} onChange={(e) => setNewService({ ...newService, date: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '2.5rem' }}>
              <button className="save-btn" onClick={handleAddService} style={{ background: '#2563eb', padding: '0.875rem 2rem' }}>Create Entry</button>
              <button className="cancel-btn" onClick={() => setShowServiceModal(false)} style={{ padding: '0.875rem 2rem' }}>Discard</button>
            </div>
          </div>
        </div>
      )}
      {showExpenseModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '450px' }}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>New Expense</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Log a new expense for a trip</p>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trip</label>
                <select
                  value={newExpense.tripId}
                  onChange={(e) => setNewExpense({ ...newExpense, tripId: e.target.value })}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <option value="">Select Trip</option>
                  {trips.map(t => (
                    <option key={t.id} value={t.id}>Trip #{t.id} - {t.vehicle_plate}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ display: 'none' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Driver</label>
                <input type="text" placeholder="e.g. John" value={newExpense.driver} onChange={(e) => setNewExpense({ ...newExpense, driver: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fuel Cost</label>
                <input type="text" placeholder="e.g. 19k" value={newExpense.fuelCost} onChange={(e) => setNewExpense({ ...newExpense, fuelCost: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Misc Expense</label>
                <input type="text" placeholder="e.g. 3k" value={newExpense.miscExpense} onChange={(e) => setNewExpense({ ...newExpense, miscExpense: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '2.5rem' }}>
              <button className="save-btn" onClick={handleAddExpense} style={{ background: '#10b981', padding: '0.875rem 2rem' }}>Create</button>
              <button className="cancel-btn" onClick={() => setShowExpenseModal(false)} style={{ padding: '0.875rem 2rem' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDriverModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '450px' }}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>New Driver</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Register a new driver profile</p>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                <input type="text" placeholder="e.g. John Doe" value={newDriver.name} onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License Number</label>
                <input type="text" placeholder="e.g. 23223" value={newDriver.licenseNumber} onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License Expiry</label>
                <input type="date" value={newDriver.expiryDate} onChange={(e) => setNewDriver({ ...newDriver, expiryDate: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '2.5rem' }}>
              <button className="save-btn" onClick={handleAddDriver} style={{ background: '#3b82f6', padding: '0.875rem 2rem' }}>Create Profile</button>
              <button className="cancel-btn" onClick={() => setShowDriverModal(false)} style={{ padding: '0.875rem 2rem' }}>Discard</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
