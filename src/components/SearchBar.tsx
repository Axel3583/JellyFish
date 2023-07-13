import React, { useState } from "react";
import { City } from "../models/city";

interface SearchBarProps {
  onCitySelect: (city: City) => void; // Fonction de rappel pour sélectionner une ville
  cities: City[]; // Liste des villes disponibles
}

/**
 * Composant SearchBar pour rechercher et sélectionner une ville.
 * @component
 * @param {Object} props - Les props du composant.
 * @param {function} props.onCitySelect - Fonction de rappel pour sélectionner une ville.
 * @param {City[]} props.cities - Liste des villes disponibles.
 */

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, cities }: { onCitySelect: Function; cities: City[]; }) => {
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const [, setSelectedCity] = useState<City | null>(null); // État pour la ville sélectionnée

  /**
   * Gère le changement de saisie de l'utilisateur dans le champ de recherche.
   * @param {React.ChangeEvent<HTMLInputElement>} event - L'événement de changement d'entrée.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Gère le clic sur une ville dans la liste des résultats de recherche.
   * @param {City} city - La ville sélectionnée.
   */
  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setSearchTerm("");
    setSelectedCity(city);
  };

  /**
   * Filtre les villes en fonction du terme de recherche.
   * @param {City} city - La ville à filtrer.
   * @returns {boolean} `true` si la ville correspond au terme de recherche, sinon `false`.
   */
  const filteredCities = cities.filter((city) =>
    city.nm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Gère l'appui sur la touche Entrée dans le champ de recherche.
   * @param {React.KeyboardEvent<HTMLInputElement>} event - L'événement de la touche enfoncée.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
        <div className="relative m-10 w-full md:w-64">
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
          {searchTerm && (
            <div className="absolute z-10 w-full md:w-64 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
