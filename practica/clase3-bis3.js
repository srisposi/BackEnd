//Ejemplo de creacion de servidor sin Express
//Utilizando los pacquetes de node
//Utilización de nodemon
const http = require("http");
const moment = require("moment");
const PORT = 3037;

const server = http.createServer((req, res)=>{
    let response = "Mensaje por defecto";
    let horaActual = moment().format("HH");
    if ( 6 > horaActual < 12){ response = "Muy buenos días";}
    else if (12 > horaActual < 18) { response = "Muy buenos días";}
    else {response = "Buenas Noches";}
    res.end(`Saludo --> ${response}`)
})

server.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`);
})