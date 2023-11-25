import TransparentButton from "../../atoms/TransparentButton";
import StyledContainerButtons from "./styled";

type ContainetButtonsProps = {
  selected: string;
  handleClick(e: any): void;
}

export default function ContainerButtons({ selected, handleClick }: ContainetButtonsProps) {
  return (
    <StyledContainerButtons>
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
    </StyledContainerButtons>
  );
}
