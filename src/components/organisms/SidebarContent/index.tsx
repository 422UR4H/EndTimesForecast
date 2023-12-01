import { RiSearch2Line } from "react-icons/ri";
import StyledSearchForm from "../../../styles/SearchForm";
import Header from "../../molecules/Header";
import StyledMainInput from "../../../styles/MainInput";
import Temperature from "../../atoms/Temperature";
import StyledLine from "../../../styles/Line";
import MainDate from "../../atoms/MainDate";
import SwitchBox from "../../molecules/SwitchBox";
import { CityData, CityLatLng, TemperatureData } from "../../../pages/HomePage";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import { AxiosError, AxiosResponse } from "axios";
import utils from "../../../utils/utils";
import StyledSidebarContent from "./style";
import { Theme, Unit } from "../../../utils/enums";
import { ThemeContext } from "styled-components";

type SidebarContentProps = {
  temperatureData: TemperatureData;
  cityLatLng: CityLatLng | undefined;
  setCityLatLng(cityLatLng: CityLatLng): void;
  unit: Unit;
  setUnit(unit: Unit): void;
  setCitiesData(citiesData: CityData[]): void;
  setShowModal(showModal: boolean): void;
  themeTitle: Theme;
  toggleTheme(): void;
};

export default function SidebarContent({
  temperatureData,
  cityLatLng,
  setCityLatLng,
  unit,
  setUnit,
  setCitiesData,
  setShowModal,
  themeTitle,
  toggleTheme,
}: SidebarContentProps) {
  const [userTimestamp, setUserTimestamp] = useState<number | undefined>();
  const [inputCity, setInputCity] = useState<string>("");
  const { avgTemperature, sky, weatherIcon } = temperatureData;
  const inputRef = useRef<HTMLInputElement>(null);

  const themeContext = useContext(ThemeContext);
  const buttonColor = themeContext?.colors.primary;
  const background = themeContext?.colors.secondaryBackground;
  const color = themeContext?.colors.primaryText;

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
              utils.errorAlert(background, color, buttonColor);
            });
        }
      );
    }
  }, []);

  function toggleUnit() {
    setUnit(unit === Unit.Celsius ? Unit.Fahrenheit : Unit.Celsius);
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
        if (!response.data.results || response.data.results.length < 1) {
          utils.cityNotFoundAlert(background, color, buttonColor);
          return;
        }
        const cities: CityData[] = response.data.results.map(getCityData);
        setCitiesData(cities);
        if (cities.length === 1) {
          setCityLatLng(cities[0].cityLatLng);
          return;
        }
        setShowModal(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert(background, color, buttonColor);
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
    <StyledSidebarContent>
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
    </StyledSidebarContent>
  );
}
