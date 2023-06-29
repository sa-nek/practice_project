const { getCoordsByCityName, getWeatherByCoords } = require("../controllers");

const mainRouter = require("express").Router();

mainRouter.get("/city/:city", getCoordsByCityName);

mainRouter.post("/weather", getWeatherByCoords);

module.exports = mainRouter;
