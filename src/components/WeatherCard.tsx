import React, { useEffect, useState } from "react";
import meteo from "../../public/assets/weather-icons/meteo.png";
import nuage from "../../public/assets/weather-icons/des-nuages.png";
import meteo_neon from "../../public/assets/weather-icons/meteo-neon.png";
import WeatherForecast from "../components/Forecast";
import WeatherInfo from "./WeatherInfo";
import { City } from "../models/city";
import { fetchWeatherData, fetchForecastData } from "../services/weatherApi";
import { Dna } from "react-loader-spinner";

interface WeatherCardProps {
  selectedCity: City | null;
}

/**
 * Composant WeatherCard pour afficher les informations météorologiques.
 * @component
 * @param {Object} props - Les props du composant.
 * @param {City | null} props.selectedCity - La ville sélectionnée.
 */

const WeatherCard: React.FC<WeatherCardProps> = ({ selectedCity }: { selectedCity: City | null; }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  /**
   * Effectue une requête API pour récupérer les données météorologiques et les prévisions.
   * @async
   * @function fetchData
   */

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCity) {
        try {
          const { lat, lon } = selectedCity;
          const forecastResponse = await fetchForecastData(lat, lon);
          const filteredForecastData = filterForecastData(forecastResponse.list);
          setForecastData(filteredForecastData);

          const weatherResponse = await fetchWeatherData(lat, lon);
          setWeatherData(weatherResponse);

          setDataLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [selectedCity]);

  const temperature = weatherData?.main?.temp;
  const temperatureCelsius = temperature ? Math.round(temperature - 273.15) : null;
  let icon = null;
  switch (weatherData?.weather[0]?.icon) {
    case "01n":
      icon = nuage;
      break;
    case "04n":
      icon = meteo;
      break;
    case "03n":
        icon = nuage;
        break;
    case "02n":
      icon = meteo_neon;
      break;
    default:
      icon = meteo_neon;
  }
  const humidity = weatherData?.main?.humidity;
  const precipitation = weatherData?.main?.pressure;
  const wind = weatherData?.wind?.speed;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  /**
   * Filtre les données de prévision pour obtenir les prévisions des 3 prochains jours.
   * @function filterForecastData
   * @param {Object[]} data - Les données de prévision brutes.
   * @returns {Object[]} Les données de prévision filtrées.
   */

  const filterForecastData = (data: any[]): any[] => {
    const filteredData: any[] = [];
    const dateMap: Map<string, boolean> = new Map();

    for (let i = 0; i < data.length; i++) {
      const forecast = data[i];
      const forecastDate = forecast.dt_txt.split(" ")[0];
      if (!dateMap.has(forecastDate)) {
        filteredData.push(forecast);
        dateMap.set(forecastDate, true);
      }

      if (filteredData.length >= 4) {
        break;
      }
    }

    return filteredData;
  };

  return (
    <div className="w-full mt-10 px-4 md:px-8 lg:px-16 xl:px-20 justify-center container overflow-hidden z-0 relative p-3 mx-auto">
      {selectedCity && dataLoaded ? (
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 xl:w-1/3">
            <div className="w-full h-96 rounded-lg bg-auto bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="p-6">
                <h2 className="text-3xl font-bold pb-1">{dayOfWeek}</h2>
                <h3 className="pb-2 pl-1 mt-2 text-sm">
                  {formattedDate} {formattedTime}
                </h3>
                <div className="flex items-center">
                  <img className="w-5 m-1" src={icon} alt="Logo" />
                  
                  {selectedCity && <div className="opacity-75">{selectedCity.nm}</div>}
                </div>
                <div className="mt-6">
                  <div className="flex items-center pt-30">
                    <img className="w-20 h-20 mr-3" src={icon} alt="Logo" />
                    <strong className="text-8xl font-semibold leading-none">
                      {`${temperatureCelsius}°C`}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col ml-0 mt-4 lg:mt-0">
            <div className="lg:my-3 bg-gray-800 m-2.5 text-white p-8 rounded-xl flex-grow">
              <div className="mb-8">
                <WeatherInfo label="Precipitation" value={`${precipitation} mm`} />
                <WeatherInfo label="Humidity" value={`${humidity} %`} />
                <WeatherInfo label="Wind" value={`${wind} mph`} />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div className="flex text-center pt-2 mb-2 flex-grow">
                  {forecastData.map((forecast: any, index: number) => (
                    <WeatherForecast
                      key={index}
                      day={new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                      temperature={`${Math.round(forecast.main.temp - 273.15)}°C`}
                      icon={forecast.weather[0].icon === "01n" ? meteo : nuage}
                      isCurrentDay={index === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <Dna height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
