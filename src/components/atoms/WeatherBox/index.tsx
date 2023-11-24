import StyledWeatherBox from "./styled";

type WeatherBoxProps = {
  title: string;
  value: string;
};

export default function WeatherBox({ title, value }: WeatherBoxProps) {
  return (
    <StyledWeatherBox>
      {title}
      {value}
    </StyledWeatherBox>
  );
}
