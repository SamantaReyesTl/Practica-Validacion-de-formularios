import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("brur", (input) => {
        valida(input.target);
    });
});
