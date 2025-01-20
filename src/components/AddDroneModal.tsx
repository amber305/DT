import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, AlertCircle, Wifi } from 'lucide-react';
import { useDroneStore } from '../store/droneStore';
import { scanForDrones } from '../services/socket';

interface AddDroneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDroneModal({ isOpen, onClose }: AddDroneModalProps) {
  const addDrone = useDroneStore((state) => state.addDrone);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    maxAltitude: 0,
  });

  const handleScan = async () => {
    setScanning(true);
    setScanError(null);

    try {
      const drones = await scanForDrones();
      if (Array.isArray(drones) && drones.length > 0) {
        // Add all detected drones
        drones.forEach(drone => {
          addDrone({
            name: drone.name || `Detected Drone ${Math.random().toString(36).substr(2, 9)}`,
            model: drone.model || 'Unknown Model',
            status: 'active',
            batteryLevel: drone.batteryLevel || 100,
            location: drone.location || { latitude: 0, longitude: 0 },
            lastMaintenance: new Date().toISOString().split('T')[0],
            maxAltitude: drone.maxAltitude || 5000,
            currentAltitude: drone.altitude || 0,
            speed: drone.speed || 0
          });
        });
        onClose();
      } else {
        setScanError('No drones found in range');
        setScanning(false);
      }
    } catch (error) {
      setScanError(error instanceof Error ? error.message : 'Failed to scan for drones');
      setScanning(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDrone({
      ...formData,
      status: 'inactive',
      batteryLevel: 100,
      location: { latitude: 0, longitude: 0 },
      lastMaintenance: new Date().toISOString().split('T')[0],
      currentAltitude: 0,
      speed: 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Drone</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {!scanning && !scanError && (
          <div className="text-center py-8">
            <button
              onClick={handleScan}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Search className="h-5 w-5 mr-2" />
              Scan for Nearby Drones
            </button>
          </div>
        )}

        {scanning && (
          <div className="text-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <Wifi className="h-16 w-16 text-blue-200 animate-pulse" />
              </div>
              <p className="text-lg font-medium text-gray-700">Scanning for Devices...</p>
              <p className="text-sm text-gray-500">Please wait while we search for nearby drones</p>
            </div>
          </div>
        )}

        {scanError && (
          <div className="text-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Device Error</p>
                <p className="text-sm text-gray-500 mt-1">{scanError}</p>
              </div>
              <button
                onClick={handleScan}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={() => setScanError(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Add Drone Manually
              </button>
            </div>
          </div>
        )}

        {!scanning && scanError && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Altitude (m)</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.maxAltitude}
                  onChange={(e) => setFormData({ ...formData, maxAltitude: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Drone
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}