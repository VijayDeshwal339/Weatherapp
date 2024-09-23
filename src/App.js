import React, { useState, useEffect } from 'react';
import CityName from './components/CityName';
import CurrentTemp from './components/CurrentTemp';
import WeatherCondition from './components/WeatherCondition';
import WeatherIcon from './components/WeatherIcon';
import ForecastCard from './components/ForecastCard';
import SearchModal from './components/SearchModal';
import useWeather from './hooks/useWeather';
import { Toaster } from 'react-hot-toast'; 

const App = () => {
  const [city, setCity] = useState('New York');  
  const [unit, setUnit] = useState('metric');   
  
  const { weatherData, forecastData, fetchWeatherData, hasError } = useWeather(city, unit);

  
  useEffect(() => {
    fetchWeatherData(); 
  }, [city, unit]); 

  
  const toggleUnit = () => setUnit(unit === 'metric' ? 'imperial' : 'metric');

  return (
    <div className="min-h-screen bg-blue-200 p-5">
      <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow-lg">
        <Toaster position="top-center" reverseOrder={false} />

        {!hasError && weatherData && weatherData.main && weatherData.weather ? (
          <>
            <CityName name={weatherData.name} />
            <div className="flex items-center justify-between">
              <CurrentTemp temp={weatherData.main.temp} unit={unit} />
              <WeatherIcon icon={weatherData.weather[0].icon} />
            </div>
            <WeatherCondition condition={weatherData.weather[0].description} />
          </>
        ) : (
          <p>{hasError ? "City not found or unable to fetch weather data" : "Loading weather data..."}</p>
        )}

        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={toggleUnit}
        >
          Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>

        <SearchModal setCity={setCity} />  {/* Pass setCity to SearchModal */}

        {forecastData.length > 0 && !hasError && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {forecastData.map((day, index) => (
              <ForecastCard key={index} day={day} unit={unit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
