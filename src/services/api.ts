import axios, { AxiosError, AxiosResponse } from "axios";

async function getGeocoding(city: string, country = "Brasil")/*: Promise<AxiosResponse | AxiosError | void> */{
  const URL = import.meta.env.VITE_GEOCODING_API_URL;
  const KEY = import.meta.env.VITE_GEOCODING_API_KEY;
  return axios.get(`${URL}q=${city},+${country}&no_annotations=1&key=${KEY}`);
}

function getWeather(lat: number | string, lon: number | string) {
  const URL = import.meta.env.VITE_OPEN_WEATHER_API_URL;
  const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return axios.get(`${URL}lat=${lat}&lon=${lon}&appid=${KEY}`);
}

const api = {
  getWeather,
  getGeocoding,
};
export default api;
