import { MouseEvent, ReactNode } from "react";
import StyledMainButton from "./styled";

type MainButtonProps = {
  children: ReactNode;
  onClick(e: MouseEvent): void;
};

export default function MainButton({ children, onClick }: MainButtonProps) {
  return <StyledMainButton onClick={onClick}>{children}</StyledMainButton>;
}
