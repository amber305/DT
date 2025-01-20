import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export function useConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setIsConnecting(false);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setIsConnecting(false);
    };

    const onConnectError = () => {
      setIsConnected(false);
      setIsConnecting(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    // Simulate initial connection attempt
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(false);
    }, 3000);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      clearTimeout(timer);
    };
  }, []);

  return { isConnected, isConnecting };
}