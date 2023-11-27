import StyledMainInput from "../styles/MainInput";
import { useEffect, useRef, useState } from "react";
import Header from "../components/molecules/Header";
import Temperature from "../components/atoms/Temperature";
import StyledLine from "../styles/Line";
import SwitchBox from "../components/organisms/SwitchBox";
import Locality from "../components/atoms/Locality";
import WeaterContent from "../components/organisms/WeatherContent";
import StyledHomePage from "./styled";
import MainDate from "../components/atoms/MainDate";
import ContainerButtons from "../components/molecules/ContainerButtons";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";

type HomePageProps = {
  themeTitle: string;
  toggleTheme(): void;
};

export type CityLatLng = {
  // city: string;
  lat: string | number;
  lng: string | number;
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
  const [avgTemperature, setAvgTemperature] = useState<number>(0);
  const [sky, setSky] = useState<string>("");
  const [selected, setSelected] = useState<string>("today");
  const [inputCity, setInputCity] = useState<string>("");
  const [cityLatLng, setCityLatLng] = usePersistedState<CityLatLng>("lat_lng", {
    // city: "",
    lat: 0,
    lng: 0,
  });
  const [weatherData, setWeatherData] = useState<WeatherData>({
    min: 0,
    max: 0,
    humidity: 0,
    windSpeed: 0,
  });
  const [unit, setUnit] = usePersistedState<string>(
    "temperatureUnit",
    "celsius"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cityLatLng?.lat == undefined || cityLatLng?.lng == undefined) {
      return;
    }
    api
      .getWeather(cityLatLng.lat, cityLatLng.lng)
      .then((response: AxiosResponse) => {
        console.log(response);

        const { temp, temp_max, temp_min, humidity } = response.data.main;
        const weather: WeatherData = {
          min: temp_min,
          max: temp_max,
          humidity,
          windSpeed: response.data.wind.speed,
        };
        setWeatherData(weather);
        setAvgTemperature(temp);
        setSky(response.data.weather[0].main)
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
          const cityLatLng = { lat: city.geometry.lat, lng: city.geometry.lng };
          cities.push({ state, state_district, state_code, cityLatLng });
        });
        setCitiesData(cities);
        setShowModal(true);
        // const selectedCity = selectUserCity(response.data.results);
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
        <Temperature temperature={avgTemperature} unit={unit} skyStatus={sky} />
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
        <Locality />
        <WeaterContent weatherData={weatherData} unit={unit} />
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
