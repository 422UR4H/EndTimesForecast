import { useState } from "react";
import StyledHomePage from "./styled";
import CitiesModal from "../components/molecules/CitiesModal";
import usePersistedState from "../hooks/usePersistedState";
import MainContent from "../components/organisms/MainContent";
import SidebarContent from "../components/organisms/SidebarContent";

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

export type TemperatureData = {
  avgTemperature: number | undefined;
  weatherIcon: string;
  sky: string;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  // TODO: type this
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avgTemperature, setAvgTemperature] = useState<number | undefined>();
  const [sky, setSky] = useState<string>("");
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
  const temperatureData = { avgTemperature, sky, weatherIcon };

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
