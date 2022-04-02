const express = require("express");
const routerCarrito = express.Router();
const ServiceCarrito = require("../services/ServiceCarrito");

let carrito = new ServiceCarrito("./data/db.json");

routerCarrito.get("/", async (req, res) => {
  res.status(200).json(await carrito.getAll());
})

routerCarrito.get("/:id", async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await carrito.getById(id));
});

routerCarrito.post("/", async (req, res) => {
  res.status(200).json(await carrito.createCarrito());
});

routerCarrito.put("/add/:id", async (req, res) => {
  let { id } = req.params;
  let { idProducto } = req.body;
  res.status(200).json(await carrito.addProductoById(id, idProducto));
});

routerCarrito.put("/remove/:id", async (req, res) => {
  let { id } = req.params;
  let { idProducto } = req.body;
  res.status(200).json(await carrito.removeProductoById(id, idProducto));
});

routerCarrito.delete("/:id", async (req, res) => {
  let {id} = req.params;
  await carrito.deleteById(id);
  res.status(200).json("carrito eliminado");
});

module.exports = routerCarrito;
