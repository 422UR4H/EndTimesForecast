import { ReactNode } from "react";
import StyledTransparentButton from "./styled";

type TransparentButtonProps = {
  children: ReactNode;
  onClick(e: any): void;
  isSelected: boolean;
};

export default function TransparentButton({
  children,
  onClick,
  isSelected,
}: TransparentButtonProps) {
  return (
    <StyledTransparentButton onClick={onClick} $isSelected={isSelected}>
      {children}
    </StyledTransparentButton>
  );
}
