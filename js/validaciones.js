export function valida(input) {                             // se exporta para poderlo usar en otros lugares del codigo
    const tipoDeInput = input.dataset.tipo;                 //con dataset obtenemos toda la colección de los data, y con tipo el data que pusimos en el html
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.Validity.valid){                               // si es valido que quite la clase 
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else{                                                 //sino poner la clase
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}   
  
const tipoDeErrores = [
    "valueMissing", "typeMismatch", "patternMismatch", "CustomError"
];

const mensajesDeError = {                                   // mejor organizacion de codigo
    nombre: {
        valueMissing: "Este campo Nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo Correo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo Contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo Nacimiento no puede estar vacío",
        CustomError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo Numero no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 números"
    },
    direccion: {
        valueMissing: "El campo Numero no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 números"
    },
    Ciudad: {
        valueMissing: "El campo Cuidad no puede estar vacío",
        patternMismatch: "El formato requerido es de 4 a 20 caracteres"
    },
    Estado: {
        valueMissing: "El campo Estado no puede estar vacío",
        patternMismatch: "El formato requerido es de 3 a 15 caracteres"
    }

};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),        //nacimiento es el nombre de "data"
};

function mostrarMensajeError(tipoDeInput, input){           //ayudara a acceder a los mensajes de error
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.Validity[error]){                         // si es true el mensaje sera "El campo no puede estar vacio"
            console.log(tipoDeInput, error);
            console.log(input.Validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput];
        }
    });

    return mensaje;
}
  
function validarNacimiento(input) {                        //Funcion para saber si es mayor de edad
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
    
    input.setCustomValidity(mensaje);
}
  
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
  
//checarse porque no me sirve la resticcion de edad :c