import { RiSearch2Line } from "react-icons/ri";
import StyledMainInput from "../styles/MainInput";
import { useEffect, useRef, useState } from "react";
import Header from "../components/molecules/Header";
import Temperature from "../components/atoms/Temperature";
import StyledLine from "../styles/Line";
import SwitchBox from "../components/molecules/SwitchBox";
import StyledHomePage from "./styled";
import MainDate from "../components/atoms/MainDate";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";
import utils from "../utils/utils";
import StyledSearchForm from "../styles/SearchForm";
import MainContent from "../components/organisms/MainContent";

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

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  // TODO: type this
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avgTemperature, setAvgTemperature] = useState<number | undefined>();
  const [sky, setSky] = useState<string>("");
  const [userTimestamp, setUserTimestamp] = useState<number | undefined>();
  const [inputCity, setInputCity] = useState<string>("");
  const [cityLatLng, setCityLatLng] = usePersistedState<CityLatLng | undefined>(
    "lat_lng",
    undefined
  );
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

  function toggleUnit() {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
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

  function setTemperatureData(sky: string, icon: string, temp: number) {
    setSky(sky);
    setWeatherIcon("https://openweathermap.org/img/wn/" + icon + "@2x.png");
    setAvgTemperature(temp);
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
      <MainContent
        cityLatLng={cityLatLng}
        setTemperatureData={setTemperatureData}
        unit={unit}
      />
    </StyledHomePage>
  );
}
