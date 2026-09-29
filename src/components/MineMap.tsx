import React, { useState, useEffect } from 'react';
import { Navigation } from 'lucide-react';

export const MineMap: React.FC = () => {
  const [roverPosition, setRoverPosition] = useState({ x: 250, y: 180 });
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoverPosition(prev => ({
        x: Math.min(380, Math.max(120, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.min(220, Math.max(140, prev.y + (Math.random() - 0.5) * 10))
      }));
      setDirection(prev => prev + (Math.random() - 0.5) * 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Mine Map</h3>
        <span className="text-xs text-gray-500">Zone B → Gallery 04</span>
      </div>
      
      <div className="relative bg-gray-900 rounded-lg h-[400px] overflow-hidden">
        <svg viewBox="0 0 500 350" className="w-full h-full">
          {/* Dark background */}
          <rect width="500" height="350" fill="#1f2937" />
          
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#374151" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="350" fill="url(#grid)" />
          
          {/* Main Entry Tunnel - Horizontal */}
          <path d="M 30 180 L 450 180" 
                stroke="#4b5563" strokeWidth="30" fill="none" strokeLinecap="round" />
          <path d="M 30 180 L 450 180" 
                stroke="#6b7280" strokeWidth="24" fill="none" strokeLinecap="round" />
          
          {/* Gallery branches */}
          {/* Gallery 01 - Top left */}
          <path d="M 100 180 L 100 80" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 100 180 L 100 80" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery 02 - Top middle */}
          <path d="M 200 180 L 200 60" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 200 180 L 200 60" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery 03 - Top right */}
          <path d="M 300 180 L 300 70" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 300 180 L 300 70" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery 04 - Bottom left */}
          <path d="M 150 180 L 150 280" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 150 180 L 150 280" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery 05 - Bottom middle */}
          <path d="M 250 180 L 250 290" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 250 180 L 250 290" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery 06 - Bottom right */}
          <path d="M 350 180 L 350 270" 
                stroke="#4b5563" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 350 180 L 350 270" 
                stroke="#6b7280" strokeWidth="18" fill="none" strokeLinecap="round" />
          
          {/* Gallery Labels */}
          <text x="100" y="55" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 01</text>
          <text x="200" y="35" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 02</text>
          <text x="300" y="45" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 03</text>
          <text x="150" y="305" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 04</text>
          <text x="250" y="315" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 05</text>
          <text x="350" y="295" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="600">Gallery 06</text>
          
          {/* Main Entry Label */}
          <text x="30" y="165" textAnchor="start" fontSize="11" fill="#9ca3af" fontWeight="600">Main Entry</text>
          
          {/* Safe Zone - Gallery 01 */}
          <rect x="70" y="90" width="60" height="60" fill="#10b981" opacity="0.2" rx="8" />
          <circle cx="100" cy="120" r="15" fill="#10b981" opacity="0.3" />
          <path d="M92 120 L98 126 L108 114" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Danger Zone - Gallery 06 */}
          <rect x="320" y="230" width="60" height="60" fill="#ef4444" opacity="0.2" rx="8" />
          <circle cx="350" cy="260" r="15" fill="#ef4444" opacity="0.3" />
          <path d="M350 248 L344 258 L356 258 Z" stroke="#ef4444" strokeWidth="2" fill="none" />
          <text x="350" y="256" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">!</text>
          
          {/* Debris markers */}
          <g transform="translate(150, 230)">
            <line x1="-8" y1="-8" x2="8" y2="8" stroke="#f97316" strokeWidth="3" />
            <line x1="-8" y1="8" x2="8" y2="-8" stroke="#f97316" strokeWidth="3" />
          </g>
          <g transform="translate(380, 170)">
            <line x1="-6" y1="-6" x2="6" y2="6" stroke="#f97316" strokeWidth="2" />
            <line x1="-6" y1="6" x2="6" y2="-6" stroke="#f97316" strokeWidth="2" />
          </g>
          
          {/* Relay nodes with Wi-Fi symbol */}
          <g transform="translate(80, 180)">
            <circle r="12" fill="#3B82F6" opacity="0.9" />
            <circle r="8" fill="#60a5fa" />
            <circle r="3" fill="#93c5fd" />
            <path d="M-5 -8 Q0 -12 5 -8" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
            <path d="M-8 -11 Q0 -16 8 -11" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
            <text y="28" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="600">R1</text>
          </g>
          
          <g transform="translate(180, 180)">
            <circle r="12" fill="#3B82F6" opacity="0.9" />
            <circle r="8" fill="#60a5fa" />
            <circle r="3" fill="#93c5fd" />
            <path d="M-5 -8 Q0 -12 5 -8" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
            <path d="M-8 -11 Q0 -16 8 -11" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
            <text y="28" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="600">R2</text>
          </g>
          
          <g transform="translate(280, 180)">
            <circle r="12" fill="#3B82F6" opacity="0.7" />
            <circle r="8" fill="#60a5fa" opacity="0.8" />
            <circle r="3" fill="#93c5fd" opacity="0.9" />
            <path d="M-5 -8 Q0 -12 5 -8" stroke="#93c5fd" strokeWidth="1.5" fill="none" opacity="0.9" />
            <path d="M-8 -11 Q0 -16 8 -11" stroke="#93c5fd" strokeWidth="1.5" fill="none" opacity="0.9" />
            <text y="28" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="600">R3</text>
          </g>
          
          {/* Victim location - Pin with person icon */}
          <g transform="translate(250, 260)">
            <path d="M0 0 C-12 -18 -18 -25 -18 -38 A18 18 0 1 1 18 -38 C18 -25 12 -18 0 0" 
                  fill="#EC4899" opacity="0.9" />
            <circle cx="0" cy="-38" r="8" fill="#fce7f3" />
            {/* Person icon */}
            <circle cx="0" cy="-42" r="4" fill="#EC4899" />
            <path d="M-4 -36 Q0 -32 4 -36 L4 -28 L-4 -28 Z" fill="#EC4899" />
            <text y="18" textAnchor="middle" fontSize="9" fill="#fce7f3" fontWeight="600">Victim</text>
          </g>
          
          {/* Rover with direction indicator */}
          <g transform={`translate(${roverPosition.x}, ${roverPosition.y})`}>
            <circle r="20" fill="#3B82F6" opacity="0.9" />
            <circle r="16" fill="#2563eb" />
            <circle r="12" fill="#1d4ed8" />
            {/* Direction arrow */}
            <g transform={`rotate(${direction})`}>
              <path d="M0 -10 L-6 4 L0 0 L6 4 Z" fill="white" />
            </g>
            {/* Rover path trail */}
            <circle r="3" fill="#3B82F6" opacity="0.3" transform="translate(-15, 5)" />
            <circle r="3" fill="#3B82F6" opacity="0.4" transform="translate(-10, 8)" />
            <circle r="3" fill="#3B82F6" opacity="0.5" transform="translate(-5, 10)" />
          </g>
          
          {/* Legend */}
          <g transform="translate(310, 10)">
            <rect width="180" height="130" fill="#1f2937" opacity="0.95" rx="8" stroke="#374151" strokeWidth="1" />
            
            <text x="10" y="22" fontSize="12" fill="#e5e7eb" fontWeight="700">Legend</text>
            
            {/* Row 1 */}
            <circle cx="20" cy="45" r="8" fill="#3B82F6" />
            <circle cx="20" cy="45" r="5" fill="#2563eb" />
            <text x="38" y="49" fontSize="11" fill="#d1d5db" fontWeight="500">Rover</text>
            
            <circle cx="95" cy="45" r="6" fill="#3B82F6" opacity="0.7" />
            <circle cx="95" cy="45" r="3" fill="#60a5fa" />
            <text x="108" y="49" fontSize="11" fill="#d1d5db" fontWeight="500">Relay</text>
            
            {/* Row 2 */}
            <path d="M20 65 C16 60 16 58 16 52 A6 6 0 1 1 28 52 C28 58 28 60 24 65" 
                  fill="#EC4899" />
            <circle cx="22" cy="52" r="3" fill="#fce7f3" />
            <text x="38" y="65" fontSize="11" fill="#d1d5db" fontWeight="500">Victim</text>
            
            <g transform="translate(95, 65)">
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#f97316" strokeWidth="2" />
              <line x1="-5" y1="5" x2="5" y2="-5" stroke="#f97316" strokeWidth="2" />
            </g>
            <text x="108" y="69" fontSize="11" fill="#d1d5db" fontWeight="500">Debris</text>
            
            {/* Row 3 */}
            <rect x="12" y="82" width="16" height="16" fill="#ef4444" opacity="0.3" rx="3" />
            <path d="M20 86 L17 92 L23 92 Z" stroke="#ef4444" strokeWidth="1.5" fill="none" />
            <text x="38" y="94" fontSize="11" fill="#d1d5db" fontWeight="500">Danger</text>
            
            <rect x="87" y="82" width="16" height="16" fill="#10b981" opacity="0.3" rx="3" />
            <path d="M90 87 L93 90 L98 84" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <text x="108" y="94" fontSize="11" fill="#d1d5db" fontWeight="500">Safe</text>
            
            {/* Row 4 */}
            <rect x="12" y="108" width="16" height="16" fill="#6b7280" opacity="0.3" rx="3" />
            <text x="38" y="120" fontSize="11" fill="#d1d5db" fontWeight="500">Tunnel</text>
          </g>
        </svg>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <Navigation className="w-4 h-4 text-blue-500" />
        <span>Rover → Zone B → Gallery 04</span>
      </div>
    </div>
  );
};
