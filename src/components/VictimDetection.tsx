import React from 'react';
import { User, MapPin, Thermometer, Ear } from 'lucide-react';
import { VictimDetection as VictimDetectionType } from '../types/telemetry';

interface VictimDetectionProps {
  data: VictimDetectionType;
}

export const VictimDetection: React.FC<VictimDetectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-pink-500" />
        <h3 className="text-lg font-semibold text-gray-900">AI Victim Detection</h3>
      </div>
      
      {data.detected ? (
        <div className="space-y-4">
          {/* Thermal preview placeholder */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-16 h-24 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-sm"></div>
              <div className="absolute top-1/3 left-1/3 w-12 h-20 bg-gradient-to-t from-red-500 to-orange-400 rounded-full blur-sm"></div>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-pink-500 flex items-center justify-center animate-pulse">
                <User className="w-10 h-10 text-pink-500" />
              </div>
              <p className="text-white font-bold text-lg">POSSIBLE VICTIM DETECTED</p>
            </div>
          </div>

          {/* Detection details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Confidence</p>
              <p className="text-xl font-bold text-gray-900">{data.confidence}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Distance</p>
              <p className="text-xl font-bold text-gray-900">{data.distance} m</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-gray-500" />
              <Ear className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{data.detectionType}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              data.status === 'CONFIRMED' ? 'bg-pink-100 text-pink-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {data.status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{data.location}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No victims detected</p>
        </div>
      )}
    </div>
  );
};
