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

const SearchBar: React.FC<SearchBarProps> = ({
  onCitySelect,
  cities,
}: {
  onCitySelect: Function;
  cities: City[];
}) => {
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
    <div className="text-center pt-10">
      <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="relative">
          <input
            type="text"
            id="search-dropdown"
            className=" w-64 p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            placeholder="Search cities..."
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            required
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <ul className="bg-white border-gray-100 w-full mt-2 ">
          {searchTerm && (
            <div className="absolute z-10 w-full md:w-64 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul className="py-2">
                {filteredCities.map((city) => (
                  <li
                    key={city.id}
                    className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                    onClick={() => handleCityClick(city)}
                  >
                    <svg
                      className="stroke-current absolute w-4 h-4 left-2 top-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {city.nm}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
  //     <div className="flex justify-center">
  //       <div className="relative m-10 w-full md:w-64">
  // <input
  //   type="text"
  //   id="search-dropdown"
  //   className="bg-purple-white shadow rounded border-0 p-3 block w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //   placeholder="Search cities..."
  //   value={searchTerm}
  //   onKeyDown={handleKeyDown}
  //   onChange={handleInputChange}
  //   required
  // />
  //         {searchTerm && (
  //           <div className="absolute z-10 w-full md:w-64 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
  //             <ul className="py-2">
  //               {filteredCities.map((city) => (
  //                 <li
  //                   key={city.id}
  //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
  //                   onClick={() => handleCityClick(city)}
  //                 >
  //                   {city.nm}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </form>
  // );
};

export default SearchBar;
