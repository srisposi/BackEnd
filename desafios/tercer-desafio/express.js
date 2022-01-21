//Creación de servidor con Express
const productos = require("./index")
const express = require("express");
const app = express();
const PORT = 3038;
let primerProducto = new Contenedor("./productos.txt");

//El Servidor me devuelve todo el json
app.get("/productos", (req, res, next) => {
    res.json(primerProducto.getAll());
})

//Genero un número Random
let getRandom = () => {
    return Math.ceil(Math.random()*20);
}
let resultado = {};
//TO DO reemplazar el número por el maxID que tenemos en el JSON  
for (let i = 0; i < 4; i++){
    let numAleatorio = getRandom();
    resultado[numAleatorio] = resultado.hasOwnProperty(numAleatorio) ? resultado[numAleatorio] + 1 : 1;
}

//El Servidor me devuelve el producto dentro del json
//con el id coincidente
app.get("/productosRandom", (req, res, next) => {
    res.json(primerProducto.getById(resultado));
})




app.listen(PORT, ()=> {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => {console.log(error);})