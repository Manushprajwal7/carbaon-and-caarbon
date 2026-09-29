export interface TelemetryData {
  roverStatus: 'ONLINE' | 'OFFLINE' | 'WARNING';
  connectionStrength: number; // dBm
  battery: number; // percentage
  missionTime: string;
  currentZone: string;
  methane: number; // % LEL
  co: number; // ppm
  oxygen: number; // %
  temperature: number; // °C
  humidity: number; // %
  possibleVictims: number;
  confirmedVictims: number;
  speed: number; // m/s
  motorL: number; // A
  motorR: number; // A
  distanceTravelled: number; // m
  gpsAvailable: boolean;
  connectionType: string;
  roverMode: string;
}

export interface GasReading {
  time: string;
  ch4: number;
  co: number;
  o2: number;
}

export interface ZoneEnvironment {
  zone: string;
  temperature: number;
  humidity: number;
}

export interface SafetyStatus {
  name: string;
  value: number;
}

export interface SensorStatus {
  name: string;
  status: 'Online' | 'Offline' | 'Warning';
  details?: string;
}

export interface SignalReading {
  time: string;
  strength: number;
}

export interface Relay {
  id: string;
  distance: number;
}

export interface MissionEvent {
  time: string;
  event: string;
}

export interface VictimDetection {
  detected: boolean;
  confidence: number;
  distance: number;
  detectionType: string;
  status: 'CONFIRMED' | 'POSSIBLE' | 'FALSE_POSITIVE';
  location: string;
}

export interface SafetyAlert {
  type: 'success' | 'warning' | 'danger';
  message: string;
  timestamp: string;
}
