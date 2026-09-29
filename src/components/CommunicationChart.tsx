import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { SignalReading } from '../types/telemetry';

interface CommunicationChartProps {
  data: SignalReading[];
  relayDeployed: boolean;
  relays: Array<{ id: string; distance: number }>;
}

export const CommunicationChart: React.FC<CommunicationChartProps> = ({
  data,
  relayDeployed,
  relays
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Communication Signal Strength</h3>
        {relayDeployed && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            RELAY DEPLOYED
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            domain={[-90, -50]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <ReferenceLine y={-80} stroke="#F59E0B" strokeDasharray="5 5" label="Weak Signal" />
          <Line
            type="monotone"
            dataKey="strength"
            name="Signal (dBm)"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">Active Relays:</p>
        <div className="flex gap-4">
          {relays.map((relay, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-sm text-gray-600">{relay.id} — {relay.distance} m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
