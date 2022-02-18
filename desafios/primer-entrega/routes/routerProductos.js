const express = require("express");
const routerProductos = express.Router();

const producto = new Producto();

producto.get("/:id", (req, res) => {
  let respuesta = producto.listar();
  res.json(respuesta);
});

routerProductos.post("/", (req, res) => {
  let productoAgregar = req.body;
  let respuesta = producto.agregar(productoAgregar);
  res.redirect("/");
});

routerProductos.put("/:id", (req, res) => {
  let response = producto.update(req.params.id, req.body);
  res.json(response);
});

routerProductos.delete("/:id", (req, res) => {
  let response = producto.borrar(req.params.id);
  res.json(response);
});

module.exports = { routerProductos, producto };
