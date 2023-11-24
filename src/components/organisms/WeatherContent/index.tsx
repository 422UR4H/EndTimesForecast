import WeatherBox from "../../atoms/WeatherBox";
import StyledWeatherContent from "./styled";

export default function WeaterContent() {
  return (
    <StyledWeatherContent>
      <div>
        <WeatherBox title="Mínima" value="31°C" />
        <WeatherBox title="Mínima" value="31°C" />
        <WeatherBox title="Mínima" value="31°C" />
        <WeatherBox title="Mínima" value="31°C" />
      </div>
      <p>Não, você não deve levar um casaquinho!</p>
    </StyledWeatherContent>
  );
}
