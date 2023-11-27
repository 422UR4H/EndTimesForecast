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
  const [selected, setSelected] = useState<string>("today");
  const [inputCity, setInputCity] = useState<string>("");
  const [cityLatLng, setCityLatLng] = useState<CityLatLng>({
    city: "",
    lat: 0,
    lng: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

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
    // selectUserCity([
    //   { nome: 'Cidade A', pais: 'País A', latitude: 123, longitude: 456 },
    //   { nome: 'Cidade B', pais: 'País B', latitude: 789, longitude: 987 },
    // ])

    api
      .getGeocoding(inputCity)
      .then((response: AxiosResponse) => {
        // console.log(response);
        const selectedCity = selectUserCity(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // TODO: message to user
      });
  }

  function selectUserCity(cities: any[]) {
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
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa escolher uma cidade";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const escolhaUsuario = parseInt(result.value); // Obtendo a escolha do usuário como um número inteiro
        const cidadeEscolhida = cities[escolhaUsuario]; // Obtendo a cidade escolhida com base no índice
        const latitude = cidadeEscolhida.latitude;
        const longitude = cidadeEscolhida.longitude;
        console.log(latitude, longitude);
        // Continuar com a lógica para utilizar a latitude e longitude escolhidas
        // ...
      }
    });
  }

  // async function handleKeyDown(e: any): Promise<void> {
  //   e.preventDefault();
  //   if (e.key === "Enter") await handleSubmit();
  //   handleInput(e);
  // }

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
            // onKeyDown={handleKeyDown}
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
