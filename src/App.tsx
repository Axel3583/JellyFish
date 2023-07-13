import { useState } from "react";
import SearchBar from "./components/searchBar";
import { City } from "./models/city";
import cityData from "./services/data/city.json";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCitySelect = (city: City) => {
    console.log(city);
    setSelectedCity(city);
  };

  return (
    <div>
    <SearchBar cities={cityData} onCitySelect={handleCitySelect} />
    {selectedCity && <WeatherCard selectedCity={selectedCity} />}
  </div>
  );
}

export default App;
