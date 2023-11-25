import StyledLine from "../../../styles/Line";
import Temperature from "../../atoms/Temperature";
import Date from "../../atoms/Date";
import StyledInfo from "./styled";

export default function Info() {
  return (
    <StyledInfo>
      <Temperature />
      <StyledLine />
      <Date />
    </StyledInfo>
  );
}
