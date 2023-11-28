import { WeatherData } from "../../../pages/HomePage";
import WeatherBox from "../../atoms/WeatherBox";
import StyledWeatherContent from "./styled";
import utils from "../../../utils/utils";

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
        <WeatherBox title="Umidade" value={(weatherData?.humidity || 0) + "%"} />
        <WeatherBox title="Velocidade do vento" value={weatherData?.windSpeed || 0} />
      </div>
      <p>
        {(weatherData?.min || 0) < 290.15
          ? `Não esqueça de levar o casaquinho!`
          : `Não, você não deve levar um casaquinho!`}
      </p>
    </StyledWeatherContent>
  );
}
