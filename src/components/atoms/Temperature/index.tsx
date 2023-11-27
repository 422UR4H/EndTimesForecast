import utils from "../../../utils/utils";
import StyledTemperature from "./styled";

type TemperatureProps = {
  temperature: number;
  unit: string;
  skyStatus: string;
};

type SkyAndColor = {
  sky: string;
  color: string;
}

export default function Temperature({ temperature, unit, skyStatus }: TemperatureProps) {
  const { sky, color } = formatSkyAndColor(skyStatus);
  const temp: string[] = utils
    .getConvertedTemperature(Number(temperature), unit)
    .split("°");
  
  return (
    <StyledTemperature>
      <div>
        <span className="value" style={{ color }}>{temp[0]}</span>
        <span className="unit" style={{ color }}>°{temp[1]}</span>
      </div>
      <p>{sky}</p>
    </StyledTemperature>
  );
}

function formatSkyAndColor(sky: string): SkyAndColor {
  switch (sky) {
    case "Clear":
      return { sky: "Céu aberto", color: "#EC6E4C" };
    case "Clouds":
      return { sky: "Nublado", color: "#7b7b7b" };
    case "Rain":
      return { sky: "Chovendo", color: "#3F8EFC" };
    case "Snow":
      return { sky: "Nevando", color: "#D8D8D8" };
    case "Thunderstorm":
      return { sky: "Tempestade", color: "#4D4494" };
    case "Drizzle":
      return { sky: "Chuviscando", color: "#06BCC1" };
    case "Mist":
      return { sky: "Neblina", color: "#D8D8D8" };
    }
    return { sky: "Error", color: "red" };
}
