import { useState } from "react";
import StyledHomePage from "./styled";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";
import MainContent from "../components/organisms/MainContent";
import SidebarContent from "../components/organisms/SidebarContent";
import {
  BASE_URL_ICON,
  FINAL_URL_ICON,
  LAT_LNG_PERSISTED_KEY,
  TEMP_UNIT_PERSISTED_KEY,
  URL_ICON,
} from "../utils/constants";
import { Theme, Unit } from "../utils/enums";

type HomePageProps = {
  themeTitle: Theme;
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

export type TemperatureData = {
  avgTemperature: number | undefined;
  weatherIcon: string;
  sky: string;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avgTemperature, setAvgTemperature] = useState<number | undefined>();
  const [sky, setSky] = useState<string>("");
  const [cityLatLng, setCityLatLng] = usePersistedState<CityLatLng | undefined>(
    LAT_LNG_PERSISTED_KEY,
    undefined
  );
  const [weatherIcon, setWeatherIcon] = useState<string>(URL_ICON);
  const [unit, setUnit] = usePersistedState<Unit>(
    TEMP_UNIT_PERSISTED_KEY,
    Unit.Celsius
  );
  const temperatureData = { avgTemperature, sky, weatherIcon };

  function setTemperatureData(sky: string, icon: string, temp: number): void {
    setSky(sky);
    setWeatherIcon(BASE_URL_ICON + icon + FINAL_URL_ICON);
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

      <SidebarContent
        temperatureData={temperatureData}
        cityLatLng={cityLatLng}
        setCityLatLng={setCityLatLng}
        unit={unit}
        setUnit={setUnit}
        setCitiesData={setCitiesData}
        setShowModal={setShowModal}
        themeTitle={themeTitle}
        toggleTheme={toggleTheme}
      />
      <MainContent
        cityLatLng={cityLatLng}
        setTemperatureData={setTemperatureData}
        unit={unit}
      />
    </StyledHomePage>
  );
}
