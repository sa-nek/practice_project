const SearchResults = ({ cities, setCurrentCity }) => {
  return (
    <div className="py-2 px-4 gap-2 flex flex-col">
      <p>Search results: </p>
      {!cities.length ? (
        <p>No results</p>
      ) : (
        cities.map((city, index) => (
          <div
            key={index}
            className="py-2 cursor-pointer border rounded-lg p-2"
            onClick={() => {
              setCurrentCity(city);
            }}
          >
            <p>City: {city.name}</p>
            <p>Country: {city.country}</p>
            <p>Latitude: {city.latitude}</p>
            <p>Longitude: {city.longitude}</p>
            <p>Population: {city.population}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
