import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { SafetyStatus } from '../types/telemetry';

interface SafetyChartProps {
  data: SafetyStatus[];
}

const COLORS = {
  'Safe': '#3B82F6',
  'Caution': '#F59E0B',
  'Breathing Apparatus Required': '#EC4899',
  'No Entry': '#EF4444'
};

export const SafetyChart: React.FC<SafetyChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mine Zone Safety Status</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            labelStyle={{
              fontSize: '12px',
              fontWeight: '600',
              fill: '#374151'
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS] || '#6b7280'} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={50}
            iconType="circle"
            wrapperStyle={{ paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
