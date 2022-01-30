const express = require("express");
const app = express();
const PORT = 8080;
const FRASE = "Hola Clase como están";

app.get("/api/frase", (req, res, next) => {
  res.json({ response: FRASE });
});

app.get("/letras/:num", (req, res, next) => {
  let { num } = req.params;
  let respuesta = null;
  //Number(num) sirve para convertirlo en número
  //y verificar si es un número
  if (Number(num)) {
    let frase = FRASE.split("");
    let final_num = Number(num) - 1;
    if (Number(num) > frase.length) {
      respuesta = "El parámetro esta fuera del rango";
    } else {
      respuesta = frase[num];
    }
  } else {
    respuesta = "El parámetro no es un número";
  }
  res.json({ response: respuesta });
});

app.get("/palabras/:num", (req, res, next) => {
  let { num } = req.params;
  let respuesta = null;
  if (Number(num)) {
    let frase = FRASE.split(" ");
    let final_num = Number(num) - 1;
    if (Number(num) > frase.length) {
      respuesta = "El parámetro estpa fuera del rango";
    } else {
      respuesta = frase[final_num];
    }
  } else {
    respuesta = "El parámetro no es un número";
  }
  res.json({ response: respuesta });
});

app.listen(PORT, () => {
  console.log(`Estamos escuchando: http://localhost:${PORT}`);
});
