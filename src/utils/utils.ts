import Swal from "sweetalert2";

function errorAlert(): void {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo deu errado!",
    // footer: '<a href="#">Por que eu estou vendo esse problema?</a>',
  });
}

function toUpperFirstLetter(name: string) {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase() + n.substring(1))
    .join(" ");
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

function getDateAndWeekday(date: number | Date, joinChar = "-") {
  if (typeof date === "number") date = new Date(date);

  const splittedDate = dateFormat(date.toISOString(), joinChar).split(joinChar);
  const newDate = [splittedDate[0], splittedDate[1]].join(joinChar);

  const weekday = formatWeekday(date.toString().split(" ")[0])
    .slice(0, 3)
    .toLowerCase();

  return newDate + " (" + weekday + ")";
}

function getWeekdayAndHour(date: string | Date) {
  if (typeof date !== "string") date = date.toString();

  const day = date.split(" ");
  const weekday = formatWeekday(day[0]);
  return weekday + ", " + formatHour(day[4]);
}

function formatWeekday(day: string) {
  switch (day) {
    case "Mon":
      return "Segunda-feira";
    case "Tue":
      return "Terça-feira";
    case "Wed":
      return "Quarta-feira";
    case "Thu":
      return "Quinta-feira";
    case "Fri":
      return "Sexta-feira";
    case "Sat":
      return "Sábado";
    case "Sun":
      return "Domingo";
    default:
      return "Um belo dia";
  }
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
  toUpperFirstLetter,
  getWeekdayAndHour,
  getDateAndWeekday,
  dateFormat,
};
export default utils;
