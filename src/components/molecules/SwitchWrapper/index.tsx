import MainSwitch from "../../atoms/MainSwitch";
import StyledSwitchBox from "./styled";

// TODO: refactor repeated type
type SwitchBoxProps = {
  checked: boolean;
  toggle(): void;
  children: string;
};

export default function SwitchWrapper({
  checked,
  toggle,
  children,
}: SwitchBoxProps) {
  return (
    <StyledSwitchBox>
      <MainSwitch checked={checked} toggle={toggle} />
      <p>{children}</p>
    </StyledSwitchBox>
  );
}
