const { default: axios } = require("axios");
const getCoordsByCityName = async (req, res) => {
  try {
    const city = req.params.city;
    let count = parseInt(req.query.count);
    if (!count || count <= 0) {
      count = 5;
    }
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${count}&language=en&format=json`
    );
    if (!response.data.results) {
      res.status(404).json({ message: "No data" });
    }
    const cityArr = response.data.results?.map((city) => {
      return {
        country: city.country,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population || 0,
      };
    });
    res.json(cityArr);
  } catch (error) {
    res.status(400).json(error.code);
  }
};

const getWeatherByCoords = async (req, res) => {
  try {
    const { latitude, longitude, days } = req.body;
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      typeof days !== "number" ||
      days < 1
    ) {
      return res.json({
        message: "latitude, longitude and days must be a numbers",
      });
    }
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,snowfall,weathercode,windspeed_10m&forecast_days=${days}`
    );
    const { hourly_units, hourly } = response.data;
    const weatherArr = [];
    for (let i = 0; i < hourly.time.length; i++) {
      let weatherHourly = {
        time: hourly.time[i],
        temperature: hourly.temperature_2m[i],
        rain: hourly.rain[i],
        snowfall: hourly.snowfall[i],
        windspeed: hourly.windspeed_10m[i],
        weathercode: hourly.weathercode[i],
      };
      weatherArr.push(weatherHourly);
    }
    const weatherDataObject = {
      units: hourly_units,
      weather: weatherArr,
    };
    res.json(weatherDataObject);
  } catch (error) {
    res.status(400).json(error.code);
  }
};

module.exports = { getCoordsByCityName, getWeatherByCoords };
