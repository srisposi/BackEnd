                //Funciones Callback

//Defino una variable a la cual le voy a pasar por parámetro
// una función y va a devolver una función.
const ejecutar = unaFuncion => unaFuncion()

//Definó la función que no recibe nada por parámetro y que va a devolver un mensaje.
const saludar = () => console.log('saludos')

ejecutar(saludar)

//===============================================

const ejecutarNueva = (unaFuncionNueva, params) => unaFuncionNueva(params)

const saludarNueva = nombre => console.log(`saludos, ${nombre}`)

ejecutarNueva(saludarNueva,'terricola')

//===============================================

const operacion = (operacionSuma, result) => operacionSuma(result)

const operacionSuma = (numUno, numDos) => result = numUno + numDos

operacion(operacionSuma(2,3))


//=================================================

function dividir (dividendo, divisor) {
    return new Promise ((resolve, reject) => {
        if (divisor == 0) {
            reject('no se puede dividir por cero')
        } else {
            resolve(dividendo/divisor)
        }
    })
}

dividir(10, 0)
    .then(resultado => {
        console.log(`resultado: ${resultado}`)
    })
    .catch(error => {
        console.log(`error: ${error}`)
    })