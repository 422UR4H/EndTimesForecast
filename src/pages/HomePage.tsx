import { RiSearch2Line } from "react-icons/ri";
import StyledMainInput from "../styles/MainInput";
import { useEffect, useRef, useState } from "react";
import Header from "../components/molecules/Header";
import Temperature from "../components/atoms/Temperature";
import StyledLine from "../styles/Line";
import SwitchBox from "../components/organisms/SwitchBox";
import Locality from "../components/atoms/Locality";
import WeatherContent from "../components/organisms/WeatherContent";
import StyledHomePage from "./styled";
import MainDate from "../components/atoms/MainDate";
import NavBar from "../components/molecules/NavBar";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";
import utils from "../utils/utils";
import StyledSearchForm from "../styles/SearchForm";
import ForecastChart from "../components/molecules/ForecastChart";

type HomePageProps = {
  themeTitle: string;
  toggleTheme(): void;
};

export type CityLatLng = {
  city: string;
  lat: number;
  lng: number;
};

export type CityData = {
  state: string;
  description: string;
  state_code: string;
  cityLatLng: CityLatLng;
};

export type WeatherData = {
  min: number;
  max: number;
  humidity: number;
  windSpeed: number;
};

export type ForecastData = {
  timestamp: number;
  avgTemperature: number;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  // TODO: type this
  const [forecastData, setForecastData] = useState<ForecastData[]>();
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avgTemperature, setAvgTemperature] = useState<number | undefined>();
  const [sky, setSky] = useState<string>("");
  const [userTimestamp, setUserTimestamp] = useState<number | undefined>();
  const [selected, setSelected] = useState<string>("today");
  const [inputCity, setInputCity] = useState<string>("");
  const [cityLatLng, setCityLatLng] = usePersistedState<CityLatLng | undefined>(
    "lat_lng",
    undefined
  );
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [weatherIcon, setWeatherIcon] = useState<string>(
    "https://openweathermap.org/img/wn/01d@2x.png"
  );
  const [unit, setUnit] = usePersistedState<string>(
    "temperatureUnit",
    "celsius"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input != null) input.focus();

    if (cityLatLng == undefined) {
      navigator.geolocation.getCurrentPosition(
        (location: GeolocationPosition) => {
          const { timestamp, coords } = location;
          const { latitude: lat, longitude: lng } = coords;

          setUserTimestamp(timestamp);
          api
            .getWeatherGeo(lat, lng)
            .then((response) => {
              setCityLatLng({ lat, lng, city: response.data[0].name });
            })
            .catch((error: AxiosError) => {
              console.log(error);
              utils.errorAlert();
            });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (cityLatLng?.lat == undefined || cityLatLng?.lng == undefined) {
      return;
    }
    api
      .getWeather(cityLatLng.lat, cityLatLng.lng)
      .then((response: AxiosResponse) => {
        const { main, icon } = response.data.weather[0];
        setSky(main);
        setWeatherIcon("https://openweathermap.org/img/wn/" + icon + "@2x.png");

        const { temp, temp_max, temp_min, humidity } = response.data.main;
        const weather: WeatherData = {
          min: temp_min,
          max: temp_max,
          humidity,
          windSpeed: response.data.wind.speed,
        };
        setWeatherData(weather);
        setAvgTemperature(temp);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert();
      });

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
  }, [cityLatLng]);

  function toggleUnit() {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
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

  // TODO: type this
  function handleInput(e: any): void {
    setInputCity(e.target.value);
  }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    api
      .getGeocoding(inputCity)
      .then((response: AxiosResponse) => {
        const cities: CityData[] = response.data.results.map(getCityData);
        setCitiesData(cities);
        setShowModal(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert();
      });
  }

  function getCityData(city: any) {
    const { lat, lng } = city.geometry;
    const { state, state_district, municipality, state_code } = city.components;

    const cityName = utils.toUpperFirstLetter(inputCity);
    const cityLatLng = { city: cityName, lat, lng };
    const description = state_district || municipality || cityName;

    return { state, description, state_code, cityLatLng };
  }

  return (
    <StyledHomePage>
      {showModal && (
        <CitiesModal
          citiesData={citiesData}
          setShowModal={setShowModal}
          setCityLatLng={setCityLatLng}
        />
      )}

      <div className="sidebar">
        <Header />
        <StyledSearchForm onSubmit={handleSubmit}>
          <RiSearch2Line className="icon" />
          <StyledMainInput
            ref={inputRef}
            name="inputCity"
            type="text"
            placeholder="Procure por uma cidade"
            value={inputCity}
            onChange={handleInput}
          />
        </StyledSearchForm>
        {/* // TODO: refactor to info here */}
        <Temperature
          temperature={avgTemperature}
          unit={unit}
          skyStatus={sky}
          weatherIcon={weatherIcon}
        />
        <StyledLine />
        <MainDate userTimestamp={userTimestamp} />
        <SwitchBox
          theme={themeTitle}
          toggleTheme={toggleTheme}
          unit={unit}
          toggleUnit={toggleUnit}
        />
        <p>Todos os direitos reservados. 2023.</p>
      </div>
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
    </StyledHomePage>
  );
}

function isTodayClicked(innerHtml: string): boolean {
  return innerHtml === "Hoje";
}

function isTodaySelected(selected: string): boolean {
  return selected === "today";
}
