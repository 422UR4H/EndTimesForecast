import ReactSwitch from "react-switch";

type MainSwitchProps = {
  checked: boolean;
  toggle(): void;
};

export default function MainSwitch({ checked, toggle }: MainSwitchProps) {
  return (
    <ReactSwitch
      onChange={toggle}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      height={31}
      width={51}
      borderRadius={16}
      offColor={"#D8D8D8"}
      onColor={"#4D4494"} // or EC6E4C
      // onColor={themeContext?.colors.secondary || '#000000'}
    />
  );
}
