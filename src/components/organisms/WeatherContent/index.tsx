import WeatherBox from "../../atoms/WeatherBox";
import StyledWeatherContent from "./styled";
import utils from "../../../utils/utils";
import { WeatherData } from "../MainContent";
import CasaquinhoMessage from "../../atoms/CasaquinhoMessage";

type WeatherProps = {
  weatherData: WeatherData | undefined;
  unit: string;
};

export default function WeatherContent({ weatherData, unit }: WeatherProps) {
  return (
    <StyledWeatherContent>
      <div>
        <WeatherBox
          title="Mínima"
          value={utils.getConvertedTemperature(Number(weatherData?.min), unit)}
        />
        <WeatherBox
          title="Máxima"
          value={utils.getConvertedTemperature(Number(weatherData?.max), unit)}
        />
        <WeatherBox
          title="Umidade"
          value={(weatherData?.humidity || 0) + "%"}
        />
        <WeatherBox
          title="Velocidade do vento"
          value={weatherData?.windSpeed || 0}
        />
      </div>
      <CasaquinhoMessage minTemp={weatherData?.min}/>
    </StyledWeatherContent>
  );
}
