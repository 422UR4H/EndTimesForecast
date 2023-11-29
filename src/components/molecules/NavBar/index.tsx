import TransparentButton from "../../atoms/TransparentButton";
import StyledNavBar from "./styled";

type NavBarProps = {
  selected: string;
  handleClick(e: any): void;
}

export default function NavBar({ selected, handleClick }: NavBarProps) {
  return (
    <StyledNavBar>
      <TransparentButton
        onClick={handleClick}
        isSelected={selected === "today"}
      >
        Hoje
      </TransparentButton>
      <TransparentButton
        onClick={handleClick}
        isSelected={selected === "nextDays"}
      >
        Próximos dias
      </TransparentButton>
    </StyledNavBar>
  );
}
