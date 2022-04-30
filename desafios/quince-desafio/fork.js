let express = require("express");
const app = express();
let { fork } = require("child_process");
let child_process = fork("./child_process.js");
let cpus = require("os").cpus();
const config = require("./config");
let visitas = 0;

function sumar() {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  return suma;
}

/*
app.all("*", (req, res, next) => {
  let { url } = req;
  if (url == "/calculo-bloq") {
    let suma = sumar();
    res.send(`La suma es igual a ${suma}`);
  } else if (url == "/calculo-nobloq") {
    child_process.send("jaaljsbdajksd DESDE EL PADRE!");
    child_process.on("message", (data) => {
      res.send(`La sumatoria es ${data.res}`);
    });
  } else {
    res.send(
      `La vantidad de visitas es ${++visitas} .. cantidad de cpus ${
        cpus.length
      }`
    );
  }
});
*/

app.get("/api/randoms", (req, res, next) => {
  let { url } = req.body;
  if (url) {
    numeroRandom = Math.random(url);
  } else {
    numeroRandom = Math.random();
  }
  res.render("randoms");
});

app.listen(PORT, () => {
  console.log(`Server On! http://localhost:${config.port}`);
});
