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

const utils = {
  errorAlert,
  getConvertedTemperature,
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
  dateFormat,
};
export default utils;
