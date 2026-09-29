import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  status?: 'safe' | 'warning' | 'danger' | 'normal';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  status = 'normal',
  icon
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'safe':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'danger':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'safe':
        return <span className="text-xs font-semibold text-green-600">SAFE</span>;
      case 'warning':
        return <span className="text-xs font-semibold text-yellow-600">WARNING</span>;
      case 'danger':
        return <span className="text-xs font-semibold text-red-600">DANGER</span>;
      default:
        return <span className="text-xs font-semibold text-gray-600">NORMAL</span>;
    }
  };

  return (
    <div className={`rounded-xl border shadow-sm p-5 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {subtitle && (
        <div className="flex items-center gap-2 mt-2">
          {getStatusBadge()}
        </div>
      )}
    </div>
  );
};
