import utils from "../../../utils/utils";
import StyledDate from "./StyledDate";

export default function MainDate() {
  const date = new Date();
  return (
    <StyledDate>
      <p>{utils.dateFormat(date, '/')}</p>
      <p>Segunda-feira, 16:32</p>
    </StyledDate>
  );
}
