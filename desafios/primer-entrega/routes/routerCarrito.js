const express = require("express");
const routerCarrito = express.Router();
const Contenedor = require("../controllers/carrito");
let contenedor = new Contenedor("../controllers/carrito");

const carrito = new routerCarrito();

carrito.get("/productos/:id", (req, res) => {
  res.json(respuesta);
});

routerCarrito.post("/", (req, res) => {
  res.redirect("/");
});

routerCarrito.post("/:id/productos", (req, res) => {
  res.redirect("/");
});

routerCarrito.delete("/:id", (req, res) => {
  res.json(response);
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  res.json(response);
});

module.exports = { routerCarrito, producto };
