//Creación de servidor con Express

const express = require("express");
const { Server } = require("http");
const moment = require("moment");
const app = express();
const PORT = 3038;
let contador = 0;

app.get("/", (req, res, next) => {
    console.log(req);
    res.send(`<h1 style="color:blue"> Bienvenido a la clase de BackEnd </h1>`);
})

app.get("/visitas", (req, res, next) => {
    contador++;
    res.send(`Han visitado esta página ${contador} veces`);
})

app.get("/fyh", (req, res, next) => {
    res.json({fyh: moment().format("DD/MM/YY HH:mm:SS")});
})

app.listen(PORT, ()=> {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => {console.log(error);})