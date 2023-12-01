import Swal from "sweetalert2";
import { Unit } from "./enums";

function errorAlert(
  background?: string,
  color?: string,
  buttonColor?: string
): void {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo deu errado!",
    background: background,
    color: color,
    confirmButtonColor: buttonColor,
    // footer: '<a href="#">Por que eu estou vendo esse problema?</a>',
  });
}

function cityNotFoundAlert(
  background?: string,
  color?: string,
  buttonColor?: string
): void {
  Swal.fire({
    icon: "error",
    title: "Cidade não encontrada!",
    text: "Desculpe, não foi possível encontrar esta cidade no momento.",
    background: background,
    color: color,
    confirmButtonColor: buttonColor,
  });
}

function toUpperFirstLetter(name: string) {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase() + n.substring(1))
    .join(" ");
}

function getConvertedKelvin(kelvin: number, unit: Unit): number {
  if (unit === Unit.Celsius) return convertKelvinToCelsius(kelvin);
  return convertKelvinToFahrenheit(kelvin);
}

function getConvertedTemperature(kelvin: number, unit: Unit): string {
  let convertedTemperature: number;
  if (unit === Unit.Celsius) {
    convertedTemperature = convertKelvinToCelsius(kelvin);
  } else {
    convertedTemperature = convertKelvinToFahrenheit(kelvin);
  }
  return Math.round(convertedTemperature) + getUnit(unit);
}

function convertKelvinToCelsius(kelvin: number): number {
  return isNaN(kelvin) ? 0 : kelvin - 273.15;
}

function convertKelvinToFahrenheit(kelvin: number): number {
  return isNaN(kelvin) ? 0 : ((kelvin - 273.15) * 9) / 5 + 32;
}

function getUnit(unit: Unit) {
  return unit === Unit.Celsius ? "°C" : "°F";
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
  getUnit,
  errorAlert,
  cityNotFoundAlert,
  getConvertedKelvin,
  getConvertedTemperature,
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
  toUpperFirstLetter,
  getWeekdayAndHour,
  getDateAndWeekday,
  dateFormat,
};
export default utils;
