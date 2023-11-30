import coat from "../../../images/coat.png";
import StyledHeader from "./styled";

export default function Header() {
  return (
    <StyledHeader>
      <img src={coat} alt="coat" />
      <h1>
        Levo um
        <br /> casaquinho?
      </h1>
    </StyledHeader>
  );
}
