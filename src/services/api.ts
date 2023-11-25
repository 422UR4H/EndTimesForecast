import axios from 'axios';

export const geocodingApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const openWeatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
