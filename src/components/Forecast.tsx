import React from 'react'

interface WeatherForecastProps {
  day: string;
  icon: string;
  temperature: string;
  isCurrentDay: boolean; // Ajout de la prop isCurrentDay
}

/**
 * Composant WeatherForecast pour afficher les prévisions météorologiques d'une journée.
 * @component
 * @param {Object} props - Les props du composant.
 * @param {string} props.day - Le jour de la semaine.
 * @param {string} props.icon - L'icône météo.
 * @param {string} props.temperature - La température.
 * @param {boolean} props.isCurrentDay - Indicateur si c'est le jour actuel.
 */

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  day,
  temperature,
  icon,
  isCurrentDay,
}: { day: string; icon: string; temperature: string; isCurrentDay: boolean; }) => {
  return (
    <div className={`h-24 w-1/4 bg-gray-900 rounded-lg ${isCurrentDay ? 'current-day' : ''}`}>
      <div className="text-center pt-2 mb-2">
        <img className="w-5 m-1" src={icon} alt="Logo" />
      </div>
      <div className="grid text-center">
        <b className="font-normal">{day}</b>
        <strong className="text-xl">{temperature}</strong>
      </div>
    </div>
  );
};

export default WeatherForecast;
