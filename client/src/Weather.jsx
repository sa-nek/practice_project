import { useEffect, useState } from "react";
import { axiosInstanse } from "../config/axios";

const Weather = ({ currentCity }) => {
  const [weather, setWeather] = useState(null);
  const [days, setDays] = useState(1);
  const handleWeather = async () => {
    const response = await axiosInstanse.post("weather", {
      latitude: parseFloat(currentCity.latitude),
      longitude: parseFloat(currentCity.longitude),
      days,
    });
    setWeather(response.data);
  };
  useEffect(() => {
    if (currentCity) handleWeather();
  }, [currentCity, days]);
  return (
    <div className="w-2/3 px-2">
      <div className="flex flex-col items-center justify-center gap-2 pb-2">
        <h2 className="uppercase">
          Weather in {currentCity.name} for{" "}
          {days > 1 ? `for ${days} days` : `for ${days} day`}
        </h2>
        <div className="flex gap-4 border p-4 rounded-lg">
          <p
            onClick={() => {
              setDays(1);
            }}
            className={`${days === 1 && "underline"} cursor-pointer`}
          >
            For 1 day
          </p>
          <p
            onClick={() => {
              setDays(3);
            }}
            className={`${days === 3 && "underline"} cursor-pointer`}
          >
            For 3 days
          </p>
          <p
            onClick={() => {
              setDays(7);
            }}
            className={`${days === 7 && "underline"} cursor-pointer`}
          >
            For 7 days
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {weather?.weather
          ? weather?.weather.map((dayWeather, index) => (
              <>
                {index % 24 === 0 && (
                  <div className="w-full text-center underline text-xl">
                    {new Date(dayWeather.time).toLocaleDateString()}
                  </div>
                )}
                <div
                  key={index}
                  className="p-2 border w-2/5 relative rounded-lg"
                >
                  <p>Date: {new Date(dayWeather.time).toLocaleDateString()}</p>
                  <p>Time: {new Date(dayWeather.time).toLocaleTimeString()}</p>
                  <p>Temperature: {dayWeather.temperature} °C</p>
                  <p>Windspeed: {dayWeather.windspeed} km/h</p>
                  <p>Rain: {dayWeather.rain} mm</p>
                  <p>Snow: {dayWeather.snowfall} cm</p>
                  <img
                    src={`/weathercodes/${dayWeather.weathercode}.png`}
                    className="absolute h-10 top-5 right-5"
                  />
                </div>
              </>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Weather;
