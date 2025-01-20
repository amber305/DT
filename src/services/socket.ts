import { io } from 'socket.io-client';
import { useDroneStore } from '../store/droneStore';

// Connect to the local device tracker server
const SOCKET_URL = 'ws://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const initializeSocketConnection = () => {
  const updateDrone = useDroneStore.getState().updateDrone;
  const addDrone = useDroneStore.getState().addDrone;

  socket.on('connect', () => {
    console.log('Connected to drone tracking device');
    // Request initial drone data
    socket.emit('getDrones');
  });

  // Handle incoming drone detection
  socket.on('droneDetected', (drone: any) => {
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

  // Handle real-time drone updates
  socket.on('droneUpdate', (data: { id: string; updates: any }) => {
    updateDrone(data.id, {
      ...data.updates,
      status: 'active' // Set to active when receiving updates
    });
  });

  // Handle drone going out of range
  socket.on('droneLost', (droneId: string) => {
    updateDrone(droneId, {
      status: 'inactive',
      currentAltitude: 0,
      speed: 0
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from drone tracking device');
  });

  return () => {
    socket.disconnect();
  };
};

// Function to scan for nearby drones
export const scanForDrones = () => {
  return new Promise((resolve, reject) => {
    if (!socket.connected) {
      reject(new Error('Not connected to tracking device'));
      return;
    }

    socket.emit('startScan');
    
    // Wait for scan results
    const timeout = setTimeout(() => {
      socket.off('scanComplete');
      reject(new Error('Scan timeout'));
    }, 5000);

    socket.once('scanComplete', (drones) => {
      clearTimeout(timeout);
      resolve(drones);
    });
  });
};