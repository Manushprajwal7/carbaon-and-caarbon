import React from 'react';
import { Gauge, Zap, Activity } from 'lucide-react';
import { TelemetryData } from '../types/telemetry';

interface RoverTelemetryProps {
  telemetry: TelemetryData;
}

export const RoverTelemetry: React.FC<RoverTelemetryProps> = ({ telemetry }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rover Telemetry</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Speed</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{telemetry.speed.toFixed(2)} m/s</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Battery</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{telemetry.battery.toFixed(0)}%</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Motor L</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{telemetry.motorL.toFixed(1)} A</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Motor R</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{telemetry.motorR.toFixed(1)} A</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Distance travelled</span>
          <span className="font-semibold text-gray-900">{telemetry.distanceTravelled.toFixed(0)} m</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mission time</span>
          <span className="font-semibold text-gray-900">{telemetry.missionTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">GPS</span>
          <span className="font-semibold text-gray-500">Unavailable</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Connection</span>
          <span className="font-semibold text-gray-900">{telemetry.connectionType}</span>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-xs text-blue-600 font-semibold mb-1">ROVER MODE</p>
        <p className="text-lg font-bold text-blue-900">{telemetry.roverMode}</p>
      </div>
    </div>
  );
};
