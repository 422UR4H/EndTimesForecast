import axios from "axios";

async function getGeocoding(city: string, country = "Brasil")/*: Promise<AxiosResponse | AxiosError | void> */{
  const URL = "https://api.opencagedata.com/geocode/v1/json?";
  const KEY = import.meta.env.VITE_GEOCODING_API_KEY;
  return axios.get(`${URL}q=${city},+${country}&no_annotations=1&key=${KEY}`);
}

function getWeather(lat: number | string, lon: number | string) {
  const URL = "https://api.openweathermap.org/data/2.5/weather?";
  const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return axios.get(`${URL}lat=${lat}&lon=${lon}&appid=${KEY}`);
}

function getWeatherIcon(icon: string) {
  const URL = "https://openweathermap.org/img/wn/";
  return axios.get(`${URL}${icon}@2x.png`);
}

const api = {
  getWeather,
  getGeocoding,
  getWeatherIcon,
};
export default api;
