import React, { useState } from "react";
import { City } from "../models/city";

interface SearchBarProps {
  onCitySelect: (city: City) => void; // Fonction de rappel pour sélectionner une ville
  cities: City[]; // Liste des villes disponibles
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, cities }) => {
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const [selectedCity, setSelectedCity] = useState<City | null>(null); // État pour la ville sélectionnée

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Met à jour le terme de recherche en fonction de la saisie de l'utilisateur
  };

  const handleCityClick = (city: City) => {
    onCitySelect(city); // Appelle la fonction de rappel pour sélectionner une ville
    setSearchTerm(""); // Réinitialise le terme de recherche
    setSelectedCity(city); // Met à jour la ville sélectionnée
  };

  const filteredCities = cities.filter((city) =>
    city.nm.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtre les villes en fonction du terme de recherche

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Sélectionne la ville correspondante (si elle existe) lorsqu'on appuie sur Entrée
      const matchedCity = cities.find(
        (city) => city.nm.toLowerCase() === searchTerm.toLowerCase()
      );
      if (matchedCity) {
        handleCityClick(matchedCity);
      }
    }
  };

  return (
    <form>
      <div className="flex justify-center">
        <div className="flex justify-center">
          <div className="m-10 relative w-64">
            <input
              type="text"
              id="search-dropdown"
              className="block w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search cities..."
              value={searchTerm}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          {searchTerm && (
            <div className="relative z-10">
              <div className="absolute z-10 w-64 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  {filteredCities.map((city) => (
                    <li
                      key={city.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCityClick(city)}
                    >
                      {city.nm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
