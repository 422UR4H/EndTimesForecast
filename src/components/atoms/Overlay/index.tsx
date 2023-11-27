import StyledOverlay from "./styled";

type OverlayProps = {
  onClick(): void;
};

export default function Overlay({ onClick }: OverlayProps) {
  return <StyledOverlay onClick={onClick}></StyledOverlay>;
}
