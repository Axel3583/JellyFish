import axios from 'axios';

const API_KEY = '906a21f715df43007aafb87502bf67ac';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchForecastData = async (lat: number, lon: number) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
