import React from 'react';
import { Bone as Drone, Users, Shield, Zap } from 'lucide-react';

export function About() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About DroneTracker
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Leading the future of drone fleet management with cutting-edge IoT technology
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center">
                <Drone className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Real-time Tracking</h3>
              <p className="mt-2 text-base text-gray-500">
                Monitor your entire drone fleet in real-time with precise location data
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Advanced Security</h3>
              <p className="mt-2 text-base text-gray-500">
                Enterprise-grade security ensuring your drone data stays protected
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Zap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">IoT Integration</h3>
              <p className="mt-2 text-base text-gray-500">
                Seamless integration with IoT devices for real-time telemetry
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Team Management</h3>
              <p className="mt-2 text-base text-gray-500">
                Collaborate with your team and manage permissions effectively
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-gray-50 overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Our Mission</h3>
              <div className="mt-2 text-base text-gray-500">
                <p>
                  At DroneTracker, we're committed to revolutionizing drone fleet management through innovative technology and user-centric design. Our platform empowers organizations to efficiently manage their drone operations while ensuring safety and compliance.
                </p>
                <p className="mt-4">
                  Founded in 2024, we've quickly become an industry leader in drone management solutions, serving clients across various sectors including construction, agriculture, and emergency services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}