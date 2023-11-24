import usePersistedState from "../../../hooks/usePersistedState";
import SwitchWrapper from "../../molecules/SwitchWrapper";
import StyledSwitchBox from "./styled";
// import { useState } from "react";

type SwitchBoxProps = {
  value: string;
  toggleTheme(): void;
};

export default function SwitchBox({ value, toggleTheme }: SwitchBoxProps) {
  const [unit, setUnit] = usePersistedState<string>(
    "temperatureUnit",
    "celsius"
  );

  function toggleUnit() {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  }

  return (
    <StyledSwitchBox>
      <SwitchWrapper
        checked={unit === "fahrenheit"}
        toggle={toggleUnit}
      >
        °F
      </SwitchWrapper>
      <SwitchWrapper
        checked={value === "dark"}
        toggle={toggleTheme}
      >
        Dark Mode
      </SwitchWrapper>
    </StyledSwitchBox>
  );
}
