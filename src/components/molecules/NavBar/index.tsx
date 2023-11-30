import { Nav } from "../../../utils/enums";
import TransparentButton from "../../atoms/TransparentButton";
import StyledNavBar from "./styled";

type NavBarProps = {
  selected: Nav;
  handleClick(e: any): void;
};

export default function NavBar({ selected, handleClick }: NavBarProps) {
  return (
    <StyledNavBar>
      <TransparentButton
        onClick={handleClick}
        isSelected={selected === Nav.Today}
      >
        Hoje
      </TransparentButton>
      <TransparentButton
        onClick={handleClick}
        isSelected={selected === Nav.NextDays}
      >
        Próximos dias
      </TransparentButton>
    </StyledNavBar>
  );
}
