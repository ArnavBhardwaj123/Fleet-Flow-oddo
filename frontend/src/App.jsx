import React, { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import TripDispatcher from './pages/TripDispatcher'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="App">
      {currentPage === 'dashboard' && (
        <Dashboard 
          onNavigate={handleNavigate} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      {currentPage === 'trip-dispatcher' && (
        <TripDispatcher 
          onNavigate={handleNavigate} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
    </div>
  )
}

export default App
