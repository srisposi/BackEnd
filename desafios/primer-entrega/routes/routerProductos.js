const express = require("express");
const routerProductos = express.Router();
const Contenedor = require("../controllers/productos");

const producto = new Producto();

producto.get("/:id", (req, res) => {
  res.json(respuesta);
});

routerProductos.post("/", (req, res) => {});

routerProductos.put("/:id", (req, res) => {
  res.json(response);
});

routerProductos.delete("/:id", (req, res) => {
  res.json(response);
});

module.exports = { routerProductos, producto };
