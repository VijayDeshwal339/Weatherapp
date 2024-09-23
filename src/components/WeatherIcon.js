const WeatherIcon = ({ icon }) => (
    <img
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather icon"
      className="w-20 h-20"
    />
  );
  
  export default WeatherIcon;
  