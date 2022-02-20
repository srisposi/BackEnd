const express = require("express");
const routerProductos = express.Router();
const ServiceProductos = require("../services/productos");

let producto = new ServiceProductos("./data/db.json");

routerProductos.get("/", async (req, res) => {
  res.status(200).json(await producto.getAll());
});

routerProductos.get("/:id", async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await producto.getById(id));
});

routerProductos.post("/", async (req, res) => {
  let newProducto = req.body;
  res.status(200).json(await producto.save(newProducto));

});

routerProductos.put("/:id", async (req, res) => {
  let { id } = req.params;
  let newProducto = req.body;
  res.status(200).json(await producto.updateById(id, newProducto));
});

routerProductos.delete("/:id", async (req, res) => {
  let {id} = req.params;
  await producto.deleteById(id);
  res.status(200).json("Producto eliminado");
});

module.exports = routerProductos;
