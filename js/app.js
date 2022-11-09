import { valida } from "./validaciones";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("brur", (input) => {
        valida(input.target);
    });
});
