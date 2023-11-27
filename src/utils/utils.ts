import Swal from "sweetalert2";

function errorAlert(): void {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo deu errado!",
    // footer: '<a href="#">Por que eu estou vendo esse problema?</a>',
  });
}
const utils = { errorAlert };
export default utils;