import React from 'react'

interface WeatherForecastProps {
  day: any;
  icon: any;
  temperature: any;
  isCurrentDay: boolean; // Ajou de la la prop isCurrentDay
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  day,
  temperature,
  icon,
  isCurrentDay,
}) => {
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
