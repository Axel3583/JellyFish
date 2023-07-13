import React from 'react';

interface WeatherInfoProps {
  label: string;
  value: string;
}

/**
 * Composant WeatherInfo pour afficher une information météorologique.
 * @component
 * @param {Object} props - Les props du composant.
 * @param {string} props.label - Le libellé de l'information.
 * @param {string} props.value - La valeur de l'information.
 */

const WeatherInfo: React.FC<WeatherInfoProps> = ({ label, value }: { label: string; value: string; }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="font-bold uppercase text-90">{label}</div>
      <div className="text-right">{value}</div>
    </div>
  );
};

export default WeatherInfo;
