import { useContext, useEffect, useState } from "react";
import Locality from "../../atoms/Locality";
import ForecastChart from "../../molecules/ForecastChart";
import NavBar from "../../molecules/NavBar";
import WeatherContent from "../WeatherContent";
import { CityLatLng } from "../../../pages/HomePage";
import api from "../../../services/api";
import { AxiosError, AxiosResponse } from "axios";
import utils from "../../../utils/utils";
import StyledMainContent from "./styled";
import { Nav, Unit } from "../../../utils/enums";
import { OPEN_WEATHER_URL } from "../../../utils/constants";
import { ThemeContext } from "styled-components";

type MainContentProps = {
  cityLatLng: CityLatLng | undefined;
  setTemperatureData(sky: string, icon: string, temp: number): void;
  unit: Unit;
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
  const [selected, setSelected] = useState<Nav>(Nav.Today);
  const themeContext = useContext(ThemeContext);
  const buttonColor = themeContext?.colors.primary;
  const background = themeContext?.colors.secondaryBackground;
  const color = themeContext?.colors.primaryText;

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
        utils.errorAlert(background, color, buttonColor);
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
        utils.errorAlert(background, color, buttonColor);
      });
  }

  // TODO: type and improve this
  function handleClick(e: any) {
    const { innerHTML } = e.target;

    if (isTodayClicked(innerHTML) && !isTodaySelected(selected)) {
      setSelected(Nav.Today);
    } else if (!isTodayClicked(innerHTML) && isTodaySelected(selected)) {
      setSelected(Nav.NextDays);
    }
  }

  return (
    <StyledMainContent>
      <NavBar selected={selected} handleClick={handleClick} />
      <Locality cityLatLng={cityLatLng} />
      {selected === Nav.Today ? (
        <WeatherContent weatherData={weatherData} unit={unit} />
      ) : (
        <ForecastChart forecastData={forecastData} unit={unit} />
      )}
      <p>
        Dados fornecidos pela <a href={OPEN_WEATHER_URL}>Open Weather API</a>
      </p>
    </StyledMainContent>
  );
}

function isTodayClicked(innerHtml: string): boolean {
  return innerHtml === "Hoje";
}

function isTodaySelected(selected: Nav): boolean {
  return selected === Nav.Today;
}
