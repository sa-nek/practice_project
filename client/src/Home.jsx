import { useState } from "react";
import CitySearch from "./CitySearch";
import Weather from "./Weather";

const Home = () => {
  const [currentCity, setCurrentCity] = useState(null);
  return (
    <div className="flex w-full min-h-screen py-2">
      <CitySearch setCurrentCity={setCurrentCity} />
      {currentCity ? <Weather currentCity={currentCity} /> : ""}
    </div>
  );
};

export default Home;
