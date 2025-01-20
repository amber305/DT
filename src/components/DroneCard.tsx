import React from 'react';
import { Battery, Navigation2, Gauge, ArrowUp } from 'lucide-react';
import { Drone } from '../types';

interface DroneCardProps {
  drone: Drone;
}

export function DroneCard({ drone }: DroneCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{drone.name}</h3>
          <p className="text-sm text-gray-500">{drone.model}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[drone.status]}`}>
          {drone.status.charAt(0).toUpperCase() + drone.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Battery className="text-gray-500" size={20} />
          <span className="text-sm font-medium">{drone.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Navigation2 className="text-gray-500" size={20} />
          <span className="text-sm font-medium">{drone.speed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="text-gray-500" size={20} />
          <span className="text-sm font-medium">{drone.currentAltitude}m</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUp className="text-gray-500" size={20} />
          <span className="text-sm font-medium">{drone.maxAltitude}m max</span>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Last Maintenance: {new Date(drone.lastMaintenance).toLocaleDateString()}
      </div>
    </div>
  );
}