import { axiosInstanse } from "../config/axios";
import { useState } from "react";
import City from "./SearchResults";

const CitySearch = ({ setCurrentCity }) => {
  const [searchObject, setSearchObject] = useState({
    cityName: "",
    count: 1,
  });
  const [cities, setCities] = useState([]);
  const handleCitySearch = async () => {
    try {
      const res = await axiosInstanse.get(
        `city/${searchObject.cityName}?count=${searchObject.count}`
      );
      setCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-1/3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCitySearch();
        }}
        className="flex flex-col w-full px-4 gap-2 items-center"
      >
        <label>Find city to look for the weather</label>
        <div className="flex w-full gap-2">
          <input
            placeholder="City name"
            onChange={(e) => {
              setSearchObject({ ...searchObject, cityName: e.target.value });
            }}
            value={searchObject.cityName}
            className="w-2/3 border rounded-lg h-10 p-1"
          />
          <input
            type="number"
            onChange={(e) => {
              setSearchObject({ ...searchObject, count: e.target.value });
            }}
            min={1}
            max={16}
            value={searchObject.count}
            className="w-1/3 border rounded-lg h-10 p-1"
          />
        </div>
        <button className="border w-full h-10 rounded-lg">Search</button>
      </form>
      <div>
        <City cities={cities} setCurrentCity={setCurrentCity} />
      </div>
    </div>
  );
};

export default CitySearch;
