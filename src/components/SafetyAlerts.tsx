import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { SafetyAlert } from '../types/telemetry';

interface SafetyAlertsProps {
  alerts: SafetyAlert[];
}

export const SafetyAlerts: React.FC<SafetyAlertsProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border ${getAlertStyle(alert.type)}`}
          >
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                alert.type === 'danger' ? 'text-red-700' :
                alert.type === 'warning' ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {alert.message}
              </p>
            </div>
            <span className="text-xs text-gray-500">{alert.timestamp}</span>
          </div>
        ))}
      </div>
      
      {/* ESP32 Safety Interlock Notice */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-xs text-gray-600 font-semibold mb-1">HARDWARE SAFETY INTERLOCK</p>
          <p className="text-xs text-gray-500">ESP32-based motor control with automatic shutdown on gas detection</p>
        </div>
      </div>
    </div>
  );
};
