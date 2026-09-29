import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { GasChart } from './components/GasChart';
import { EnvironmentChart } from './components/EnvironmentChart';
import { SafetyChart } from './components/SafetyChart';
import { SensorStatus } from './components/SensorStatus';
import { CommunicationChart } from './components/CommunicationChart';
import { MissionEvents } from './components/MissionEvents';
import { VictimDetection } from './components/VictimDetection';
import { MineMap } from './components/MineMap';
import { RoverTelemetry } from './components/RoverTelemetry';
import { SafetyAlerts } from './components/SafetyAlerts';
import { useMockTelemetry } from './hooks/useMockTelemetry';
import { Flame, Wind, Droplets, Thermometer, User } from 'lucide-react';

function App() {
  const {
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
  } = useMockTelemetry();

  const getMethaneStatus = () => {
    if (telemetry.methane > 2.0) return 'danger';
    if (telemetry.methane > 1.5) return 'warning';
    return 'safe';
  };

  const getCOStatus = () => {
    if (telemetry.co > 25) return 'danger';
    if (telemetry.co > 20) return 'warning';
    return 'safe';
  };

  const getOxygenStatus = () => {
    if (telemetry.oxygen < 19.5) return 'danger';
    if (telemetry.oxygen < 20.0) return 'warning';
    return 'safe';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header
        roverStatus={telemetry.roverStatus}
        connectionStrength={telemetry.connectionStrength}
        battery={telemetry.battery}
        missionTime={telemetry.missionTime}
        currentZone={telemetry.currentZone}
      />

      <main className="max-w-[1800px] mx-auto px-4 py-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <MetricCard
            title="CH₄"
            value={`${telemetry.methane.toFixed(2)} % LEL`}
            subtitle="SAFE"
            status={getMethaneStatus()}
            icon={<Flame className="w-5 h-5" />}
          />
          <MetricCard
            title="CO"
            value={`${telemetry.co.toFixed(0)} ppm`}
            subtitle="NORMAL"
            status={getCOStatus()}
            icon={<Wind className="w-5 h-5" />}
          />
          <MetricCard
            title="O₂"
            value={`${telemetry.oxygen.toFixed(1)} %`}
            subtitle="NORMAL"
            status={getOxygenStatus()}
            icon={<Droplets className="w-5 h-5" />}
          />
          <MetricCard
            title="Temperature"
            value={`${telemetry.temperature.toFixed(1)} °C`}
            icon={<Thermometer className="w-5 h-5" />}
          />
          <MetricCard
            title="Humidity"
            value={`${telemetry.humidity.toFixed(0)} %`}
            icon={<Droplets className="w-5 h-5" />}
          />
          <MetricCard
            title="Possible Victims"
            value={telemetry.possibleVictims.toString()}
            subtitle={`${telemetry.confirmedVictims} CONFIRMED`}
            status={telemetry.confirmedVictims > 0 ? 'danger' : 'normal'}
            icon={<User className="w-5 h-5" />}
          />
        </div>

        {/* Top Row - Map, Victim Detection, Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <MineMap />
          <VictimDetection data={victimDetection} />
          <RoverTelemetry telemetry={telemetry} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GasChart data={gasData} />
              <EnvironmentChart data={zoneEnvironments} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SafetyChart data={safetyStatus} />
              <CommunicationChart data={signalData} relayDeployed={relayDeployed} relays={relays} />
            </div>
          </div>

          {/* Right Column - Status & Alerts */}
          <div className="space-y-6">
            <SensorStatus data={sensorStatuses} />
            <SafetyAlerts alerts={safetyAlerts} />
            <MissionEvents events={missionEvents} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-[1800px] mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            RakshaRover AI-Guided Mine Rescue System © 2024 | Smart India Hackathon Demo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
