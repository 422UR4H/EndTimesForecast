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
import ContainerButtons from "../components/molecules/ContainerButtons";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";
import utils from "../utils/utils";

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
  state_district: string;
  state_code: string;
  cityLatLng: CityLatLng;
};

export type WeatherData = {
  min: number;
  max: number;
  humidity: number;
  windSpeed: number;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  // TODO: type this
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avgTemperature, setAvgTemperature] = useState<number | undefined>();
  const [sky, setSky] = useState<string>("");
  const [selected, setSelected] = useState<string>("today");
  const [inputCity, setInputCity] = useState<string>("");
  const [cityLatLng, setCityLatLng] = usePersistedState<CityLatLng | undefined>(
    "lat_lng",
    undefined
  );
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [weatherIcon, setWeatherIcon] = useState<string>("");
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
          const { latitude: lat, longitude: lng } = location.coords;
          api
            .getWeatherGeo(lat, lng)
            .then((response) => {
              setCityLatLng({ lat, lng, city: response.data[0].name });
            })
            .catch((error: GeolocationPositionError) => {
              console.log(error);
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
        // utils.errorAlert();
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
        const cities: CityData[] = [];
        response.data.results.forEach((city: any) => {
          const { state, state_district, state_code } = city.components;
          const cityLatLng = {
            // city: utils.toUpperFirstLetter(inputCity),
            city: utils.getCityName(city.formatted),
            lat: city.geometry.lat,
            lng: city.geometry.lng,
          };
          cities.push({ state, state_district, state_code, cityLatLng });
        });
        setCitiesData(cities);
        setShowModal(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // TODO: message to user
      });
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
        <form onSubmit={handleSubmit}>
          <StyledMainInput
            ref={inputRef}
            name="inputCity"
            type="text"
            placeholder="Procure por uma cidade"
            value={inputCity}
            onChange={handleInput}
          />
        </form>
        {/* // TODO: refactor to info here */}
        <Temperature
          temperature={avgTemperature}
          unit={unit}
          skyStatus={sky}
          weatherIcon={weatherIcon}
        />
        <StyledLine />
        <MainDate />
        <SwitchBox
          theme={themeTitle}
          toggleTheme={toggleTheme}
          unit={unit}
          toggleUnit={toggleUnit}
        />
        <p>Todos os direitos reservados. 2023.</p>
      </div>
      <div className="main">
        <ContainerButtons selected={selected} handleClick={handleClick} />
        <Locality cityLatLng={cityLatLng} />
        <WeatherContent weatherData={weatherData} unit={unit} />
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
