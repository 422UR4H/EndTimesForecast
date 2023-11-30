import axios from "axios";
import {
  OPEN_GEOCODE_API_URL,
  OPEN_WEATHER_CURRENT_API_URL,
  OPEN_WEATHER_FORECAST_API_URL,
  OPEN_WEATHER_GEO_REVERSE_API_URL,
} from "../utils/constants";

// TODO: type this: Promise<AxiosResponse | AxiosError | void>
async function getGeocoding(city: string, country = "Brasil") {
  const KEY = import.meta.env.VITE_GEOCODING_API_KEY;
  return axios.get(
    `${OPEN_GEOCODE_API_URL}q=${city},+${country}&no_annotations=1&key=${KEY}`
  );
}

function getWeather(lat: number | string, lon: number | string) {
  const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return axios.get(
    `${OPEN_WEATHER_CURRENT_API_URL}lat=${lat}&lon=${lon}&appid=${KEY}`
  );
}

function getWeatherForecast(lat: number | string, lon: number | string) {
  const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return axios.get(
    `${OPEN_WEATHER_FORECAST_API_URL}lat=${lat}&lon=${lon}&appid=${KEY}`
  );
}

function getWeatherGeo(lat: number | string, lon: number | string) {
  const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return axios.get(
    `${OPEN_WEATHER_GEO_REVERSE_API_URL}lat=${lat}&lon=${lon}&appid=${KEY}`
  );
}

const api = {
  getWeather,
  getGeocoding,
  getWeatherGeo,
  getWeatherForecast,
};
export default api;
