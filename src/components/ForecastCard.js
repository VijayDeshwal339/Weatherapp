const ForecastCard = ({ day, unit }) => {
    const date = new Date(day.dt_txt).toLocaleDateString('en-US', {
      weekday: 'long',
    });
  
    return (
      <div className="p-4 bg-blue-100 rounded-lg text-center">
        <h3 className="font-bold">{date}</h3>
        <img
          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="mx-auto"
        />
        <p>
          {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
          {unit === 'metric' ? 'C' : 'F'}
        </p>
      </div>
    );
  };
  
  export default ForecastCard;
  