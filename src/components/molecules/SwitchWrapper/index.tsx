import MainSwitch from "../../atoms/MainSwitch";
import StyledSwitchBox from "./styled";

type SwitchWrapperProps = {
  checked: boolean;
  toggle(): void;
  children: string;
};

export default function SwitchWrapper({
  checked,
  toggle,
  children,
}: SwitchWrapperProps) {
  return (
    <StyledSwitchBox>
      <MainSwitch checked={checked} toggle={toggle} />
      <p>{children}</p>
    </StyledSwitchBox>
  );
}
