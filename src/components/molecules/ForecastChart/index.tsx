import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import utils from "../../../utils/utils";
import { ForecastData } from "../../organisms/MainContent";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import StyledContentTooltip from "./styled";
import { Unit } from "../../../utils/enums";

type ForecastChartProps = {
  forecastData: ForecastData[] | undefined;
  unit: Unit;
};

export default function ForecastChart({
  forecastData,
  unit,
}: ForecastChartProps) {
  const themeContext = useContext(ThemeContext);
  const color = themeContext?.colors.primary;
  const axisColor = themeContext?.colors.ternaryText;
  const backgroundColor = themeContext?.colors.primaryBackground;
  const secondaryBackgroundColor = themeContext?.colors.secondaryBackground;

  const formattedForecastData = forecastData?.map((fd: ForecastData) => {
    return {
      date: utils.getDateAndWeekday(fd.timestamp, "/"),
      value: utils.getConvertedKelvin(fd.avgTemperature, unit).toFixed(1),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        style={{ backgroundColor: secondaryBackgroundColor }}
        data={formattedForecastData}
        margin={{ top: 50, right: 40, left: 30, bottom: 50 }}
      >
        <CartesianGrid stroke={backgroundColor} />
        <XAxis dataKey="date" stroke={axisColor} />
        <YAxis dataKey="value" stroke={axisColor} unit={utils.getUnit(unit)} />
        <Tooltip
          contentStyle={{ ...StyledContentTooltip, backgroundColor }}
          formatter={(value: number) => [`${value}${utils.getUnit(unit)}`]}
        />
        <Line name=" " type="monotone" />
        <Line
          dataKey="value"
          stroke={color}
          dot={{ stroke: color, strokeWidth: 1.5, r: 4 }}
          activeDot={{ stroke: "#FFFFFF", strokeWidth: 0.5, r: 4 }}
          strokeWidth={1.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
