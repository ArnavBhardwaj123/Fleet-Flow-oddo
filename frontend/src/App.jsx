import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardOverview from './pages/DashboardOverview'
import VehicleRegistry from './pages/VehicleRegistry'
import MaintenanceLogs from './pages/MaintenanceLogs'
import Login from './pages/login'
import Register from './pages/register'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const location = useLocation();

  // Shared State (Vehicles & Logs)
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'MH 00', model: '2017', type: 'Mini', capacity: '5 tonn', odometer: '79000', status: 'Idle' }
  ]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    { id: 321, vehicle: 'TATA', issue: 'Engine Issue', date: '20/02', cost: '10k', status: 'New' }
  ]);

  // Form States
  const [newVehicle, setNewVehicle] = useState({ plate: '', payload: '', odometer: '', type: '', model: '' });
  const [newService, setNewService] = useState({ vehicleName: '', issue: '', date: '' });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

    if (path === '/vehicle-registry') {
      return (
        <button className="action-btn secondary" onClick={() => setShowVehicleModal(true)}>
          + New Vehicle
        </button>
      );
    }

    // Default or Home (/)
    return (
      <>
        <button className="action-btn primary">New Trip</button>
        <button className="action-btn secondary" onClick={() => setShowVehicleModal(true)}>
          + New Vehicle
        </button>
      </>
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
              <Route path="/maintenance-logs" element={
                <MaintenanceLogs
                  logs={maintenanceLogs}
                />
              } />
            </Routes>
          </Layout>
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
    </>
  )
}

export default App
