import React from 'react';
import { MissionEvent } from '../types/telemetry';

interface MissionEventsProps {
  events: MissionEvent[];
}

export const MissionEvents: React.FC<MissionEventsProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Mission Events</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{event.time}</span>
            <span className="text-sm text-gray-700">{event.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
