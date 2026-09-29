import React from 'react';
import { Activity, Wifi, Battery, AlertTriangle, Settings, Clock } from 'lucide-react';

interface HeaderProps {
  roverStatus: string;
  connectionStrength: number;
  battery: number;
  missionTime: string;
  currentZone: string;
}

export const Header: React.FC<HeaderProps> = ({
  roverStatus,
  connectionStrength,
  battery,
  missionTime,
  currentZone
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4 py-4">
        {/* Top branding */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">RAKSHAROVER</h1>
              <p className="text-sm text-gray-600">AI-Guided Mine Rescue & Monitoring System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">SYSTEM ONLINE</span>
            <span className="text-xs text-gray-500 ml-2">Live telemetry • Mock data</span>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                roverStatus === 'ONLINE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {roverStatus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">{connectionStrength} dBm</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">{battery.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">{missionTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Zone:</span>
              <span className="text-sm text-gray-900 font-semibold">{currentZone}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-xs text-gray-500">
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
