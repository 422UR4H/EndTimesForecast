import { Theme, Unit } from "../../../utils/enums";
import SwitchWrapper from "../SwitchWrapper";
import StyledSwitchBox from "./styled";

type SwitchBoxProps = {
  theme: Theme;
  toggleTheme(): void;
  unit: Unit;
  toggleUnit(): void;
};

export default function SwitchBox({
  theme,
  toggleTheme,
  unit,
  toggleUnit,
}: SwitchBoxProps) {
  return (
    <StyledSwitchBox>
      <SwitchWrapper checked={unit === Unit.Fahrenheit} toggle={toggleUnit}>
        °F
      </SwitchWrapper>
      <SwitchWrapper checked={theme === Theme.Dark} toggle={toggleTheme}>
        Dark Mode
      </SwitchWrapper>
    </StyledSwitchBox>
  );
}
