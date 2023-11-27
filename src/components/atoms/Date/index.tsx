import dayjs from "dayjs";
import utils from "../../../utils/utils";
import StyledDate from "./StyledDate";

export default function Date() {
  const date = dayjs();
  return (
    <StyledDate>
      <p>{utils.dateFormat(date, '/')}</p>
      <p>Segunda-feira, 16:32</p>
    </StyledDate>
  );
}
