//Creación de servidor con Express

const express = require("express");
const { Server } = require("http");
const app = express();
const PORT = 3038;


app.get("/", (req, res, next) => {
    console.log(req);
    res.send("Hola Desde express");
})

app.listen(PORT, ()=> {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => {console.log(error);})