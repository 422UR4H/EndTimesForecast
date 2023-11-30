import { useEffect, useState } from "react";
import Locality from "../../atoms/Locality";
import ForecastChart from "../../molecules/ForecastChart";
import NavBar from "../../molecules/NavBar";
import WeatherContent from "../WeatherContent";
import { CityLatLng } from "../../../pages/HomePage";
import api from "../../../services/api";
import { AxiosError, AxiosResponse } from "axios";
import utils from "../../../utils/utils";

type MainContentProps = {
  cityLatLng: CityLatLng | undefined;
  setTemperatureData(sky: string, icon: string, temp: number): void;
  unit: string;
};

export type ForecastData = {
  timestamp: number;
  avgTemperature: number;
};

export type WeatherData = {
  min: number;
  max: number;
  humidity: number;
  windSpeed: number;
};

export default function MainContent({
  cityLatLng,
  setTemperatureData,
  unit,
}: MainContentProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [forecastData, setForecastData] = useState<ForecastData[]>();
  const [selected, setSelected] = useState<string>("today");

  useEffect(() => {
    if (cityLatLng?.lat == undefined || cityLatLng?.lng == undefined) {
      return;
    }
    getCurrentWeather(cityLatLng);
    getWeatherForecast(cityLatLng);
  }, [cityLatLng]);

  async function getCurrentWeather(cityLatLng: CityLatLng) {
    api
      .getWeather(cityLatLng.lat, cityLatLng.lng)
      .then((response: AxiosResponse) => {
        const { main: sky, icon } = response.data.weather[0];
        const { temp, temp_max, temp_min, humidity } = response.data.main;
        const weather: WeatherData = {
          min: temp_min,
          max: temp_max,
          humidity,
          windSpeed: response.data.wind.speed,
        };
        setWeatherData(weather);
        setTemperatureData(sky, icon, temp);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert();
      });
  }

  async function getWeatherForecast(cityLatLng: CityLatLng) {
    api
      .getWeatherForecast(cityLatLng.lat, cityLatLng.lng)
      .then((response: AxiosResponse) => {
        const forecastListData: ForecastData[] = [];

        response.data.list.map((l: any) => {
          const timestamp = new Date(l.dt_txt).getTime();
          const data = { timestamp, avgTemperature: l.main.temp };
          forecastListData.push(data);
        });
        // forecastListData?.sort((a, b) => a.timestamp - b.timestamp);
        setForecastData(forecastListData);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert();
      });
  }

  // TODO: type and improve this
  function handleClick(e: any) {
    const { innerHTML } = e.target;

    if (isTodayClicked(innerHTML) && !isTodaySelected(selected)) {
      setSelected("today");
    } else if (!isTodayClicked(innerHTML) && isTodaySelected(selected)) {
      setSelected("nextDays");
    }
  }

  return (
    <div className="main">
      <NavBar selected={selected} handleClick={handleClick} />
      <Locality cityLatLng={cityLatLng} />
      {selected === "today" ? (
        <WeatherContent weatherData={weatherData} unit={unit} />
      ) : (
        <ForecastChart forecastData={forecastData} unit={unit} />
      )}
      <p>
        Dados fornecidos pela{" "}
        <a href="https://openweathermap.org/">Open Weather API</a>
      </p>
    </div>
  );
}

function isTodayClicked(innerHtml: string): boolean {
  return innerHtml === "Hoje";
}

function isTodaySelected(selected: string): boolean {
  return selected === "today";
}
