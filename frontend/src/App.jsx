import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
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

  // Shared State (Vehicles, Logs, Trips)
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'MH 00', model: '2017', type: 'Mini', capacity: '5 tonn', odometer: '79000', status: 'Idle' }
  ]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    { id: 321, vehicle: 'TATA', issue: 'Engine Issue', date: '20/02', cost: '10k', status: 'New' }
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, tripId: '321', driver: 'John', distance: '1000', fuelExpense: '19k', miscExpense: '3k', status: 'Done' }
  ]);
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', licenseNumber: '23223', expiryDate: '2026-12-31', completionRate: 92, safetyScore: 89, complaints: 4 }
  ]);
  const [showTripForm, setShowTripForm] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Auth Guard: Redirect unauthenticated users
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

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

  const handleAddVehicle = () => {
    if (!newVehicle.plate) return;
    const vehicle = {
      id: vehicles.length + 1,
      plate: newVehicle.plate,
      model: newVehicle.model,
      type: newVehicle.type,
      capacity: newVehicle.payload,
      odometer: newVehicle.odometer,
      status: 'Idle'
    };
    setVehicles([...vehicles, vehicle]);
    setShowVehicleModal(false);
    setNewVehicle({ plate: '', payload: '', odometer: '', type: '', model: '' });
  };

  const handleAddService = () => {
    if (!newService.vehicleName) return;
    const log = {
      id: Math.floor(Math.random() * 1000),
      vehicle: newService.vehicleName,
      issue: newService.issue,
      date: newService.date,
      cost: '—',
      status: 'New'
    };
    setMaintenanceLogs([...maintenanceLogs, log]);
    setShowServiceModal(false);
    setNewService({ vehicleName: '', issue: '', date: '' });
  };

  const handleAddExpense = () => {
    if (!newExpense.tripId) return;
    const expense = {
      id: expenses.length + 1,
      tripId: newExpense.tripId,
      driver: newExpense.driver,
      distance: '—',
      fuelExpense: newExpense.fuelCost,
      miscExpense: newExpense.miscExpense,
      status: 'Done'
    };
    setExpenses([...expenses, expense]);
    setShowExpenseModal(false);
    setNewExpense({ tripId: '', driver: '', fuelCost: '', miscExpense: '' });
  };

  const handleAddDriver = () => {
    if (!newDriver.name) return;
    const driver = {
      id: drivers.length + 1,
      name: newDriver.name,
      licenseNumber: newDriver.licenseNumber,
      expiryDate: newDriver.expiryDate,
      completionRate: 0,
      safetyScore: 100,
      complaints: 0
    };
    setDrivers([...drivers, driver]);
    setShowDriverModal(false);
    setNewDriver({ name: '', licenseNumber: '', expiryDate: '' });
  };

  const handleDeleteVehicle = (id) => setVehicles(vehicles.filter(v => v.id !== id));

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
            >
              <Routes>
                <Route path="/" element={
                  <DashboardOverview
                    vehiclesCount={vehicles.length}
                    maintenanceCount={maintenanceLogs.length}
                  />
                } />
                <Route path="/vehicle-registry" element={
                  <VehicleRegistry
                    vehicles={vehicles}
                    onDeleteVehicle={handleDeleteVehicle}
                  />
                } />
                <Route path="/trip-dispatcher" element={
                  <TripDispatcher
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    showForm={showTripForm}
                    setShowForm={setShowTripForm}
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
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
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
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle Name</label>
                <input type="text" placeholder="e.g. TATA" value={newService.vehicleName} onChange={(e) => setNewService({ ...newService, vehicleName: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
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
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trip ID</label>
                <input type="text" placeholder="e.g. 321" value={newExpense.tripId} onChange={(e) => setNewExpense({ ...newExpense, tripId: e.target.value })} style={{ width: '100%', padding: '0.875rem' }} />
              </div>
              <div className="form-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
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
