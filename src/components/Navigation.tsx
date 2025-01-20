import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bone as DroneIcon, WifiOff, Loader2 } from 'lucide-react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';

export function Navigation() {
  const location = useLocation();
  const { isConnected, isConnecting } = useConnectionStatus();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <DroneIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">DroneTracker</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/about'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isConnecting ? (
              <div className="flex items-center text-gray-500">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                <span className="text-sm">Connecting to Tracker...</span>
              </div>
            ) : !isConnected ? (
              <div className="flex items-center text-red-500">
                <WifiOff className="h-5 w-5 mr-2" />
                <span className="text-sm">Tracker Not Found</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}