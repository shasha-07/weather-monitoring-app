import { useEffect, useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apikey="b1b15e88fa797225412429c1c50c122a1";
  const fetchWeather= async()=>{
    if(city.trim() === "") {
      setError("Please enter a city name");
      return;
    }
    try{
      const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
      if(!response.ok){
        throw new Error("City not found");
      }
      const data= await response.json();
      setWeather(data);
      setError(null); 
    } catch(error) {
      setError(error);
    }
  }
  useEffect(() => {
    fetchWeather()
    .then(() => {
      console.log(weather);
    });
  }, [weather]);

  return (
    <>
      <h1 className="header">Weather App</h1>
      <div className="card">
      <label htmlFor="city">City Name:</label>
      <input 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
         </div>
      {error && <p style={{color: "red", textAlign: "center", fontSize: "1.2rem" }}>{error.message}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Sealevel:{weather.main.sea_level}</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}  
    </>
  );

}
export default App
