import { useState } from 'react';
import toast from 'react-hot-toast';

const useWeather = (city, unit) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hasError, setHasError] = useState(false);

  const API_KEY = 'b7fb730b7b6ef8ba9740925d6491fe97';  

  const fetchWeatherData = async () => {
    try {
      setHasError(false); 
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetch 5-day forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error('City not found');
      }

      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list.slice(0, 5));  
    } catch (error) {
      setWeatherData(null);
      setForecastData([]);
      setHasError(true);  // Set error state
      if (error.message === 'City not found') {
        toast.error('City not found. Please try a different city.');
      } else {
        toast.error('Network issue. Please check your internet connection.');
      }
    }
  };

  return { weatherData, forecastData, fetchWeatherData, hasError };
};

export default useWeather;
