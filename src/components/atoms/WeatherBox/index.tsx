import StyledWeatherBox from "./styled";

type WeatherBoxProps = {
  title: string;
  value: string | number;
};

export default function WeatherBox({ title, value }: WeatherBoxProps) {
  return (
    <StyledWeatherBox>
      <h1>{title}</h1>
      <p>{value}</p>
    </StyledWeatherBox>
  );
}
