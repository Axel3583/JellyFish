import React from 'react';

interface WeatherInfoProps {
label: string;
value: string;
 
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ label, value}) => {
    return (
        <div className="flex justify-between mb-4">
          <div className="font-bold uppercase text-90">{label}</div>
          <div className="text-right">{value}</div>
        </div>
      );
  };
  
  export default WeatherInfo;
  