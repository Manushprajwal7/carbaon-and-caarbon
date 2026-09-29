import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SensorStatus as SensorStatusType } from '../types/telemetry';

interface SensorStatusProps {
  data: SensorStatusType[];
}

export const SensorStatus: React.FC<SensorStatusProps> = ({ data }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Offline':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-50 border-green-200';
      case 'Offline':
        return 'bg-red-50 border-red-200';
      case 'Warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware Sensor Status</h3>
      <div className="space-y-2">
        {data.map((sensor, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(sensor.status)}`}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(sensor.status)}
              <span className="text-sm font-medium text-gray-700">{sensor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${
                sensor.status === 'Online' ? 'text-green-600' :
                sensor.status === 'Offline' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {sensor.status}
              </span>
              {sensor.details && (
                <span className="text-xs text-gray-500">{sensor.details}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
