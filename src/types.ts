export interface Drone {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  batteryLevel: number;
  location: {
    latitude: number;
    longitude: number;
  };
  lastMaintenance: string;
  model: string;
  maxAltitude: number;
  currentAltitude: number;
  speed: number;
}