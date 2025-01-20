import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { DroneCard } from './components/DroneCard';
import { Navigation } from './components/Navigation';
import { AddDroneModal } from './components/AddDroneModal';
import { About } from './pages/About';
import { useDroneStore } from './store/droneStore';
import { initializeSocketConnection } from './services/socket';

function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { drones, searchQuery, setSearchQuery } = useDroneStore();

  const filteredDrones = drones.filter(drone =>
    drone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drone.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Drone Fleet Overview</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search drones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Drone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrones.map(drone => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>

      <AddDroneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </main>
  );
}

function App() {
  useEffect(() => {
    const cleanup = initializeSocketConnection();
    return () => cleanup();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;