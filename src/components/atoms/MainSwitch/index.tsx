import ReactSwitch from "react-switch";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

type MainSwitchProps = {
  checked: boolean;
  toggle(): void;
};

export default function MainSwitch({ checked, toggle }: MainSwitchProps) {
  const themeContext = useContext(ThemeContext);
  const primaryColor = themeContext?.colors.primary;
  const switchOffColor = themeContext?.colors.switchOff;

  return (
    <ReactSwitch
      onChange={toggle}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      height={31}
      width={51}
      borderRadius={16}
      handleDiameter={27}
      boxShadow="0px 3px 7px 0px #0000001F"
      offColor={switchOffColor}
      onColor={primaryColor}
    />
  );
}
