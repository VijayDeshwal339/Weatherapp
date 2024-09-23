import { useState } from 'react';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

const SearchModal = ({ setCity }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_KEY = 'b7fb730b7b6ef8ba9740925d6491fe97';

  
  const fetchCitySuggestions = async (query) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setSuggestions(data);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch (error) {
      toast.error('Error fetching city suggestions');
    }
  };

  
  const handleInputChange = debounce((value) => {
    setInputValue(value);
    fetchCitySuggestions(value);
  }, 300); 

  
  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  
  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim()); 
      setInputValue('');
      setSuggestions([]);
      setShowDropdown(false);
    } else {
      toast.error('Please enter a city name');
    }
  };

  return (
    <div className="mt-4 relative">
      <input
        type="text"
        placeholder="Enter city name..."
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        onClick={handleSearch}
      >
        Search
      </button>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded w-full mt-2 max-h-40 overflow-auto z-10">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-200 cursor-pointer"
              onClick={() => handleCitySelect(city.name)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchModal;
