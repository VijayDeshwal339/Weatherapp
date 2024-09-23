const CurrentTemp = ({ temp, unit }) => (
    <p className="text-4xl font-semibold">
      {Math.round(temp)}° {unit === 'metric' ? 'C' : 'F'}
    </p>
  );
  
  export default CurrentTemp;
  