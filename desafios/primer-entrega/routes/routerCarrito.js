const express = require("express");
const routerCarrito = express.Router();
const ServiceCarrito = require("../services/carrito");

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

routerCarrito.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { idProducto } = req.body;
  res.status(200).json(await carrito.updateById(id, idProducto));
});

routerCarrito.delete("/:id", async (req, res) => {
  let {id} = req.params;
  await carrito.deleteById(id);
  res.status(200).json("carrito eliminado");
});

routerCarrito.delete("/", async (req, res) => {
  await carrito.deleteAll();
  res.status(200).json("Carrito eliminado por completo");
})

module.exports = routerCarrito;
