import Swal from "sweetalert2";

function errorAlert(): void {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo deu errado!",
    // footer: '<a href="#">Por que eu estou vendo esse problema?</a>',
  });
}

function getConvertedTemperature(kelvin: number, unit: string): string {
  if (unit === "celsius") return convertKelvinToCelsius(kelvin);
  return convertKelvinToFahrenheit(kelvin);
}

function convertKelvinToCelsius(kelvin: number): string {
  return (isNaN(kelvin) ? 0 : Math.round(kelvin - 273.15)) + "°C";
}

function convertKelvinToFahrenheit(kelvin: number): string {
  return (
    (isNaN(kelvin) ? 0 : Math.round(((kelvin - 273.15) * 9) / 5 + 32)) + "°F"
  );
}

function dateFormat(date: string | Date, joinChar = "-") {
  if (typeof date !== "string") date = date.toISOString();
  return date.split("T")[0].split("-").reverse().join(joinChar);
}

function getWeekdayAndHour(date: string | Date) {
  if (typeof date !== "string") date = date.toString();

  const day = date.split(" ");
  let weekday: string;
  switch (day[0]) {
    case "Mon":
      weekday = "Segunda-feira";
      break;
    case "Tue":
      weekday = "Terça-feira";
      break;
    case "Wed":
      weekday = "Quarta-feira";
      break;
    case "Thu":
      weekday = "Quinta-feira";
      break;
    case "Fri":
      weekday = "Sexta-feira";
      break;
    case "Sat":
      weekday = "Sábado";
      break;
    case "Sun":
      weekday = "Domingo";
      break;
    default:
      weekday = "Um belo dia";
  }
  return weekday + ", " + formatHour(day[4]);
}

function formatHour(hour: string, char = ":"): string {
  const arr = hour.split(char);
  return arr[0] + ":" + arr[1];
}

const utils = {
  errorAlert,
  getConvertedTemperature,
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
  getWeekdayAndHour,
  dateFormat,
};
export default utils;
