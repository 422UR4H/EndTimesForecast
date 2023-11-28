import utils from "../../../utils/utils";
import StyledDate from "./StyledDate";

export default function MainDate() {
  const date = new Date();
  console.log(date);
  console.log(date.toISOString());
  return (
    <StyledDate>
      <p>{utils.dateFormat(date, '/')}</p>
      <p>{utils.getWeekdayAndHour(date)}</p>
    </StyledDate>
  );
}
