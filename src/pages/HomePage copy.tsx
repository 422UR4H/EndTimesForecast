import StyledMainInput from "../styles/MainInput";
import { useRef, useState } from "react";
import Header from "../components/molecules/Header";
import Temperature from "../components/atoms/Temperature";
import StyledLine from "../styles/Line";
import SwitchBox from "../components/organisms/SwitchBox";
import Locality from "../components/atoms/Locality";
import WeaterContent from "../components/organisms/WeatherContent";
import StyledHomePage from "./styled";
import Date from "../components/atoms/Date";
import ContainerButtons from "../components/molecules/ContainerButtons";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import utils from "../utils/utils";

type HomePageProps = {
  themeTitle: string;
  toggleTheme(): void;
};

type CityLatLng = {
  city: string;
  lat: string | number;
  lng: string | number;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputCity, setInputCity] = useState<string>("");
  const [selected, setSelected] = useState<string>("today");
  const [cityLatLng, setCityLatLng] = useState<CityLatLng>({
    city: "",
    lat: 0,
    lng: 0,
  });

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

    let selectedCity: CityLatLng | undefined;
    api
      .getGeocoding(inputCity)
      .then((response: AxiosResponse) => {
        selectedCity = selectUserCity(response.data.results);
        if (selectedCity == undefined) return utils.errorAlert();

        setCityLatLng(selectedCity);
        api
          .getWeather(selectedCity.lat, selectedCity.lng)
          .then((response: AxiosResponse) => {
            console.log(response);
          })
          .catch((error: AxiosError) => {
            console.log(error);
            utils.errorAlert();
          });

      })
      .catch((error: AxiosError) => {
        console.log(error);
        utils.errorAlert();
      });
  }

  function selectUserCity(cities: any[]): CityLatLng | undefined {
    const options: any = {};
    cities.forEach((city, i) => {
      const { state, state_district, state_code } = city.components;
      options[`${i}: ${state}`] = {
        text: `${state_district}, ${state_code}`,
      };
    });

    Swal.fire({
      title: "Escolha sua cidade:",
      // input: "radio",
      input: "select",
      inputOptions: options,
      inputPlaceholder: "Selecione a cidade",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      width: 750,
      // width: "auto",
      inputValidator: (value) => {
        if (!value) return "Você precisa escolher uma cidade";
      },
    })
      .then((result) => {
        console.log("foi")
        if (result.isConfirmed) {
          console.log(cities);
          const city = cities[parseInt(result.value)];
          console.log("city");
          const { lat, lng } = city.geometry;
          return { city: city.components.city, lat, lng };
        }
      })
      .catch((error) => {
        console.log("options")
        console.log(error);
        utils.errorAlert();
      });
    return undefined;
  }

  return (
    <StyledHomePage>
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
        <Temperature />
        <StyledLine />
        <Date />
        <SwitchBox value={themeTitle} toggleTheme={toggleTheme} />
        <p>Todos os direitos reservados. 2023.</p>
      </div>
      <div className="main">
        <ContainerButtons selected={selected} handleClick={handleClick} />
        <Locality />
        <WeaterContent />
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
