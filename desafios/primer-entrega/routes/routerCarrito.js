const express = require("express");
const routerCarrito = express.Router();

const carrito = new routerCarrito();

carrito.get("/:id/productos", (req, res) => {
  let respuesta = producto.listar();
  res.json(respuesta);
});

routerCarrito.post("/", (req, res) => {
  let productoAgregar = req.body;
  let respuesta = producto.agregar(productoAgregar);
  res.redirect("/");
});

routerCarrito.post("/:id/productos", (req, res) => {
  let productoAgregar = req.body;
  let respuesta = producto.agregar(productoAgregar);
  res.redirect("/");
});

routerCarrito.delete("/:id", (req, res) => {
  let response = producto.borrar(req.params.id);
  res.json(response);
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  let response = producto.borrar(req.params.id);
  res.json(response);
});

module.exports = { routerCarrito, producto };
