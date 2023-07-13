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

const WeatherCard: React.FC<WeatherCardProps> = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState<any>(null); // État pour les données météorologiques actuelles
  const [forecastData, setForecastData] = useState<any[]>([]); // État pour les prévisions météorologiques
  const [dataLoaded, setDataLoaded] = useState(false); // État de chargement global


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
          const forecastResponse = await fetchForecastData(lat, lon); // Appel à l'API pour récupérer les prévisions météorologiques
          const filteredForecastData = filterForecastData(
            forecastResponse.list
          ); // Filtrer les prévisions sur 3 jours
          setForecastData(filteredForecastData); // Mettre à jour l'état des prévisions

          const weatherResponse = await fetchWeatherData(lat, lon); // Appel à l'API pour récupérer les données météorologiques actuelles
          setWeatherData(weatherResponse); // Mettre à jour l'état des données météorologiques actuelles

          setDataLoaded(true); // Définir l'état de chargement global sur true une fois les données chargées
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [selectedCity]);

  const temperature = weatherData?.main?.temp; // Récupérer la température actuelle
  const temperatureCelsius = temperature
    ? Math.round(temperature - 273.15) // Convertir la température en Celsius
    : null;
  const humidity = weatherData?.main?.humidity; // Récupérer l'humidité actuelle
  const precipitation = weatherData?.main?.pressure; // Récupérer la pression atmosphérique actuelle
  const wind = weatherData?.wind?.speed; // Récupérer la vitesse du vent actuelle

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }); // Formater la date actuelle (ex: "Jul 12, 2023")
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  }); // Formater l'heure actuelle (ex: "10:30 AM")

  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  }); // Récupérer le jour de la semaine actuel (ex: "Monday")


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
        // Filtrer les prévisions sur 3 jours (4 éléments car le premier est pour la journée actuelle)
        break;
      }
    }

    return filteredData;
  };

  return (
    <div className="w-full lg:mt-10 lg:px-40 justify-center container mx-auto">
      {selectedCity && dataLoaded ? (
        <div className="flex">
          <div className="w-full lg:w-auto">
            <div className="w-full h-80 flex rounded-lg bg-auto h-14 bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="rounded-lg m-2.5 py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
                <div className="mb-20">
                  <h2 className="font-bold text-3xl leading-none pb-1">
                    {dayOfWeek}
                  </h2>
                  <div className="items-center">
                    <h3 className="leading-none pb-2 pl-1 mt-2">
                      {formattedDate} {formattedTime}
                    </h3>
                    <div className="flex">
                      <img className="w-5 m-1" src={meteo_neon} alt="Logo" />
                      {selectedCity && (
                        <div className="opacity-75">{selectedCity.nm}</div>
                      )}
                    </div>
                  </div>
                  <div className="m-0">
                    <div>
                      <img className="w-20 h-90 mt-7" src={meteo} alt="Logo" />
                      <strong className="leading-none text-6xl block font-weight-bolder">
                        {`${temperatureCelsius}°C`}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex ml-0">
            <div className="lg:my-3 bg-gray-800 m-2.5 text-white p-8 rounded-xl">
              <div className="justify-between mb-8">
                <WeatherInfo
                  label="Precipitation"
                  value={`${precipitation} mm`}
                />
                <WeatherInfo label="Humidity" value={`${humidity} %`} />
                <WeatherInfo label="Wind" value={`${wind} mph`} />
              </div>

              <div className="flex-row">
                <div className="p-0 w-96 m-0 p-3">
                  <div className="flex text-center pt-2 mb-2">
                    {forecastData.map((forecast: any, index: number) => (
                      <WeatherForecast
                        key={index}
                        day={new Date(forecast.dt * 1000).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                          }
                        )}
                        temperature={`${Math.round(
                          forecast.main.temp - 273.15
                        )}°C`}
                        icon={
                          forecast.weather[0].icon === "10d" ? meteo : nuage
                        }
                        isCurrentDay={index === 0} // Vérifie si c'est le jour actuel (premier élément de la liste)
                      />
                    ))}
                  </div>
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
