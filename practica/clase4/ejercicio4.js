const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
let personas = [];
let mascotas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let routerMascotas = new Router();
let routerPersonas = new Router();

routerMascotas.get("/", (req, res, next) => {
  res.json(mascotas);
});

routerMascotas.post("/", (req, res, next) => {
  mascotas.push(req.body);
  res.json(mascotas);
});

routerPersonas.get("/", (req, res, next) => {
  res.json(personas);
});

routerPersonas.post("/", (req, res, next) => {
  personas.push(req.body);
  res.json(personas);
});

app.use("/mascotas", routerMascotas);
app.use("/personas", routerPersonas);

app.listen(PORT, () => {
  console.log(`Estamos escuchando: http://localhost:${PORT}`);
});
