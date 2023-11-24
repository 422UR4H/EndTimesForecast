import StyledTemperature from "./styled";

export default function Temperature() {
  return (
    <StyledTemperature>
      <div>
        <span className="value">31</span>
        <span className="unit">°C</span>
      </div>
      <p>Céu aberto</p>
    </StyledTemperature>
  );
}
