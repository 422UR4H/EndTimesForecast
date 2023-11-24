import ReactSwitch from "react-switch";
import { DefaultTheme } from "styled-components/dist/types";

type MainSwitchProps = {
  theme: DefaultTheme;
  toggleTheme(): void;
};

export default function MainSwitch({ theme, toggleTheme }: MainSwitchProps) {
  return (
    <ReactSwitch
      onChange={toggleTheme}
      checked={theme.title === "dark"}
      checkedIcon={false}
      uncheckedIcon={false}
      height={31}
      width={51}
      borderRadius={16}
      // offColor={themeContext?.colors.primary || '#ffffff'}
      // onColor={themeContext?.colors.secondary || '#000000'}
    />
  );
}
