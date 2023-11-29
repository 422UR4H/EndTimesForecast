import utils from "../../../utils/utils";
import StyledDate from "./StyledDate";

type MainDateProps = {
  userTimestamp: number | undefined;
};

export default function MainDate({ userTimestamp }: MainDateProps) {
  let date: Date;
  if (!!userTimestamp) {
    date = new Date(userTimestamp);
  } else {
    date = new Date();
  }
  return (
    <StyledDate>
      <p>{utils.dateFormat(date, "/")}</p>
      <p>{utils.getWeekdayAndHour(date)}</p>
    </StyledDate>
  );
}
