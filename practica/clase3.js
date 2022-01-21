let getRandom = () => {
    return Math.ceil(Math.random()*20);
}

let resultado = {};

for (let i = 0; i < 1000; i++){
    let numAleatorio = getRandom();
    resultado[numAleatorio] = resultado.hasOwnProperty(numAleatorio) ? resultado[numAleatorio] + 1 : 1;
}

console.log(`${resultado}`);
