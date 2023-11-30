import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import utils from "../../../utils/utils";
import { ForecastData } from "../../organisms/MainContent";

type ForecastChartProps = {
  forecastData: ForecastData[] | undefined;
  unit: string;
};

export default function ForecastChart({
  forecastData,
  unit,
}: ForecastChartProps) {
  const formattedForecastData = forecastData?.map((fd: ForecastData) => {
    return {
      date: utils.getDateAndWeekday(fd.timestamp, "/"),
      avgTemperature: utils.getConvertedTemperature(fd.avgTemperature, unit),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={520}>
      <LineChart
        data={formattedForecastData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid /*y={4}*/ />
        <XAxis dataKey="date" />
        <YAxis dataKey="avgTemperature" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="date" stroke="#8884d8" />
        <Line type="monotone" dataKey="avgTemperature" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
