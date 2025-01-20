import { create } from 'zustand';
import { Drone } from '../types';

interface DroneState {
  drones: Drone[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addDrone: (drone: Omit<Drone, 'id'>) => void;
  updateDrone: (id: string, updates: Partial<Drone>) => void;
  removeDrone: (id: string) => void;
}

// Helper function to get a date from N days ago
const getDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const useDroneStore = create<DroneState>((set) => ({
  drones: [
    {
      id: '1',
      name: 'Surveyor X1',
      status: 'inactive',
      batteryLevel: 85,
      location: { latitude: 40.7128, longitude: -74.0060 },
      lastMaintenance: getDaysAgo(5), // 5 days ago
      model: 'DJI Mavic 3 Pro',
      maxAltitude: 6000,
      currentAltitude: 0,
      speed: 0
    },
    {
      id: '2',
      name: 'Inspector 2000',
      status: 'maintenance',
      batteryLevel: 45,
      location: { latitude: 34.0522, longitude: -118.2437 },
      lastMaintenance: getDaysAgo(3), // 3 days ago
      model: 'Autel EVO II',
      maxAltitude: 7000,
      currentAltitude: 0,
      speed: 0
    },
    {
      id: '3',
      name: 'Sky Scout',
      status: 'inactive',
      batteryLevel: 100,
      location: { latitude: 51.5074, longitude: -0.1278 },
      lastMaintenance: getDaysAgo(2), // 2 days ago
      model: 'Skydio 2+',
      maxAltitude: 5000,
      currentAltitude: 0,
      speed: 0
    }
  ],
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addDrone: (drone) =>
    set((state) => ({
      drones: [...state.drones, { ...drone, id: crypto.randomUUID() }]
    })),
  updateDrone: (id, updates) =>
    set((state) => ({
      drones: state.drones.map((drone) =>
        drone.id === id ? { ...drone, ...updates } : drone
      )
    })),
  removeDrone: (id) =>
    set((state) => ({
      drones: state.drones.filter((drone) => drone.id !== id)
    }))
}));