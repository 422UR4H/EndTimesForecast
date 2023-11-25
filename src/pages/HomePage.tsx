import StyledMainInput from "../styles/MainInput";
import { useState } from "react";
import Header from "../components/molecules/Header";
import Temperature from "../components/atoms/Temperature";
import StyledLine from "../styles/Line";
import SwitchBox from "../components/organisms/SwitchBox";
import Locality from "../components/atoms/Locality";
import WeaterContent from "../components/organisms/WeatherContent";
import StyledHomePage from "./styled";
import Date from "../components/atoms/Date";
import ContainerButtons from "../components/molecules/ContainerButtons";

type HomePageProps = {
  themeTitle: string;
  toggleTheme(): void;
};

export default function HomePage({ themeTitle, toggleTheme }: HomePageProps) {
  const [selected, setSelected] = useState<string>("today");
  const [city, setCity] = useState<string>("");

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
    setCity(e.target.value);
  }

  return (
    <StyledHomePage>
      <div className="sidebar">
        <Header />
        <StyledMainInput
          name="city"
          type="text"
          placeholder="Procure por uma cidade"
          value={city}
          onChange={handleInput}
        />
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
          Dados fornecidos pela <a>Open Weather API</a>
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
