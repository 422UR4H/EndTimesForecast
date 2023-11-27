import { WeatherData } from "../../../pages/HomePage";
import WeatherBox from "../../atoms/WeatherBox";
import StyledWeatherContent from "./styled";
import utils from "../../../utils/utils";

type WeatherProps = {
  weatherData: WeatherData;
  unit: string;
};

export default function WeaterContent({ weatherData, unit }: WeatherProps) {
  return (
    <StyledWeatherContent>
      <div>
        <WeatherBox
          title="Mínima"
          value={utils.getConvertedTemperature(weatherData.min, unit)}
        />
        <WeatherBox
          title="Máxima"
          value={utils.getConvertedTemperature(weatherData.max, unit)}
        />
        <WeatherBox title="Umidade" value={weatherData.humidity + "%"} />
        <WeatherBox title="Velocidade do vento" value={weatherData.windSpeed} />
      </div>
      <p>
        {weatherData.min < 290.15
          ? `Não esqueça de levar o casaquinho!`
          : `Não, você não deve levar um casaquinho!`}
      </p>
    </StyledWeatherContent>
  );
}
