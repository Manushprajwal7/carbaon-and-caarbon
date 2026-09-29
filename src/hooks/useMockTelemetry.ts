import { useState, useEffect, useCallback } from 'react';
import {
  TelemetryData,
  GasReading,
  ZoneEnvironment,
  SafetyStatus,
  SensorStatus,
  SignalReading,
  MissionEvent,
  VictimDetection,
  SafetyAlert
} from '../types/telemetry';

const generateInitialGasData = (): GasReading[] => {
  const data: GasReading[] = [];
  const now = new Date();
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour12: false }),
      ch4: 0.8 + Math.random() * 0.4,
      co: 12 + Math.random() * 6,
      o2: 20.5 + Math.random() * 0.5
    });
  }
  return data;
};

const generateInitialSignalData = (): SignalReading[] => {
  const data: SignalReading[] = [];
  const now = new Date();
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour12: false }),
      strength: -65 - Math.random() * 25
    });
  }
  return data;
};

const initialMissionEvents: MissionEvent[] = [
  { time: '16:43:02', event: 'LiDAR debris detected' },
  { time: '16:42:51', event: 'Relay 03 deployed' },
  { time: '16:42:42', event: 'Possible victim marked' },
  { time: '16:42:38', event: 'Tapping sound detected' },
  { time: '16:42:31', event: 'Thermal anomaly detected' },
  { time: '16:42:18', event: 'Methane reading updated' },
  { time: '16:42:10', event: 'Zone B entered' }
];

const zoneEnvironments: ZoneEnvironment[] = [
  { zone: 'Zone A', temperature: 28, humidity: 61 },
  { zone: 'Zone B', temperature: 31, humidity: 68 },
  { zone: 'Zone C', temperature: 34, humidity: 72 },
  { zone: 'Zone D', temperature: 29, humidity: 65 }
];

const safetyStatus: SafetyStatus[] = [
  { name: 'Safe', value: 55 },
  { name: 'Caution', value: 25 },
  { name: 'Breathing Apparatus Required', value: 15 },
  { name: 'No Entry', value: 5 }
];

const sensorStatuses: SensorStatus[] = [
  { name: 'CH₄ Sensor', status: 'Online' },
  { name: 'CO Sensor', status: 'Online' },
  { name: 'H₂S Sensor', status: 'Online' },
  { name: 'O₂ Sensor', status: 'Online' },
  { name: 'Thermal Camera', status: 'Online' },
  { name: 'Night Vision', status: 'Online' },
  { name: 'LiDAR', status: 'Online' },
  { name: 'Microphones', status: 'Online' },
  { name: 'IMU', status: 'Online' },
  { name: 'BLE Tags', status: 'Online', details: '3 detected' }
];

export const useMockTelemetry = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    roverStatus: 'ONLINE',
    connectionStrength: -67,
    battery: 78,
    missionTime: '01:42:18',
    currentZone: 'Zone B',
    methane: 1.82,
    co: 18,
    oxygen: 20.6,
    temperature: 31.4,
    humidity: 68,
    possibleVictims: 2,
    confirmedVictims: 1,
    speed: 0.42,
    motorL: 1.8,
    motorR: 1.9,
    distanceTravelled: 184,
    gpsAvailable: false,
    connectionType: 'Mesh + LoRa',
    roverMode: 'AUTONOMOUS ASSIST'
  });

  const [gasData, setGasData] = useState<GasReading[]>(generateInitialGasData());
  const [signalData, setSignalData] = useState<SignalReading[]>(generateInitialSignalData());
  const [missionEvents, setMissionEvents] = useState<MissionEvent[]>(initialMissionEvents);
  const [victimDetection, setVictimDetection] = useState<VictimDetection>({
    detected: true,
    confidence: 87,
    distance: 6.2,
    detectionType: 'Thermal + Tapping',
    status: 'CONFIRMED',
    location: 'Zone B → Gallery 04 → 6.2 m'
  });
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>([
    { type: 'success', message: 'Oxygen Normal', timestamp: new Date().toLocaleTimeString() },
    { type: 'success', message: 'CO Normal', timestamp: new Date().toLocaleTimeString() },
    { type: 'warning', message: 'Methane Rising', timestamp: new Date().toLocaleTimeString() },
    { type: 'success', message: 'Roof Stable', timestamp: new Date().toLocaleTimeString() },
    { type: 'success', message: 'Communication Active', timestamp: new Date().toLocaleTimeString() },
    { type: 'danger', message: 'Possible Victim Detected', timestamp: new Date().toLocaleTimeString() }
  ]);

  const [relays] = useState([
    { id: 'Relay 01', distance: 12 },
    { id: 'Relay 02', distance: 28 },
    { id: 'Relay 03', distance: 46 }
  ]);

  const [relayDeployed, setRelayDeployed] = useState(false);

  const updateTelemetry = useCallback(() => {
    setTelemetry(prev => {
      const newMethane = Math.max(0.5, Math.min(2.5, prev.methane + (Math.random() - 0.5) * 0.2));
      const newCO = Math.max(10, Math.min(30, prev.co + (Math.random() - 0.5) * 2));
      const newOxygen = Math.max(19, Math.min(21, prev.oxygen + (Math.random() - 0.5) * 0.1));
      const newTemp = Math.max(25, Math.min(40, prev.temperature + (Math.random() - 0.5) * 0.5));
      const newHumidity = Math.max(50, Math.min(85, prev.humidity + (Math.random() - 0.5) * 2));
      const newBattery = Math.max(0, prev.battery - 0.01);
      const newSpeed = Math.max(0, Math.min(1, prev.speed + (Math.random() - 0.5) * 0.1));
      const newDistance = prev.distanceTravelled + newSpeed * 3;
      
      // Update mission time
      const [hours, minutes, seconds] = prev.missionTime.split(':').map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds + 3;
      const newHours = Math.floor(totalSeconds / 3600);
      const newMinutes = Math.floor((totalSeconds % 3600) / 60);
      const newSeconds = totalSeconds % 60;
      const newMissionTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;

      // Update connection strength
      const newSignal = -65 - Math.random() * 25;
      
      // Check for weak signal
      if (newSignal < -80 && !relayDeployed) {
        setRelayDeployed(true);
        const newEvent: MissionEvent = {
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          event: 'Relay deployed due to weak signal'
        };
        setMissionEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }

      // Random events
      if (Math.random() < 0.1) {
        const events = [
          'Thermal anomaly detected',
          'Tapping sound detected',
          'LiDAR debris detected',
          'Methane spike detected',
          'Zone boundary crossed'
        ];
        const newEvent: MissionEvent = {
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          event: events[Math.floor(Math.random() * events.length)]
        };
        setMissionEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }

      // Update safety alerts based on methane
      setSafetyAlerts(prev => {
        const updated = [...prev];
        const methaneAlert = updated.find(a => a.message.includes('Methane'));
        if (methaneAlert) {
          if (newMethane > 2.0) {
            methaneAlert.type = 'danger';
            methaneAlert.message = '⚠ METHANE WARNING - Motor interlock ready';
          } else if (newMethane > 1.5) {
            methaneAlert.type = 'warning';
            methaneAlert.message = 'Methane Rising';
          } else {
            methaneAlert.type = 'success';
            methaneAlert.message = 'Methane Normal';
          }
        }
        return updated;
      });

      return {
        ...prev,
        methane: newMethane,
        co: newCO,
        oxygen: newOxygen,
        temperature: newTemp,
        humidity: newHumidity,
        battery: newBattery,
        speed: newSpeed,
        distanceTravelled: newDistance,
        missionTime: newMissionTime,
        connectionStrength: newSignal,
        motorL: 1.7 + Math.random() * 0.3,
        motorR: 1.8 + Math.random() * 0.3
      };
    });

    // Update gas data
    setGasData(prev => {
      const newData = [...prev.slice(1)];
      const now = new Date();
      newData.push({
        time: now.toLocaleTimeString('en-US', { hour12: false }),
        ch4: telemetry.methane + (Math.random() - 0.5) * 0.2,
        co: telemetry.co + (Math.random() - 0.5) * 2,
        o2: telemetry.oxygen + (Math.random() - 0.5) * 0.1
      });
      return newData;
    });

    // Update signal data
    setSignalData(prev => {
      const newData = [...prev.slice(1)];
      const now = new Date();
      newData.push({
        time: now.toLocaleTimeString('en-US', { hour12: false }),
        strength: -65 - Math.random() * 25
      });
      return newData;
    });
  }, [telemetry.methane, telemetry.co, telemetry.oxygen, relayDeployed]);

  useEffect(() => {
    const interval = setInterval(updateTelemetry, 3000);
    return () => clearInterval(interval);
  }, [updateTelemetry]);

  return {
    telemetry,
    gasData,
    signalData,
    zoneEnvironments,
    safetyStatus,
    sensorStatuses,
    missionEvents,
    victimDetection,
    safetyAlerts,
    relays,
    relayDeployed
  };
};
