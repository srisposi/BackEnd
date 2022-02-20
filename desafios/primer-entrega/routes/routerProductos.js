const express = require("express");
const { append } = require("express/lib/response");
const routerProductos = express.Router();
<<<<<<< HEAD
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
=======
const { Router } = express;
const ContenedorProductos = require("../services/productos");

let producto = new ContenedorProductos("/home/srisposi/Documents/coderhouse/primer-entrega/data/db2.json");

routerProductos.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id)
  res.status(200).json(await producto.getById(id));
});

routerProductos.post("/", async (req, res) => {
  let productos = req.body;
  console.log(productos);
  
  res.status(200).json(await producto.save(productos));
  
});

routerProductos.put("/:id", async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  console.log(req);
  console.log(body);

  res.status(200).json(await producto.updateById(id, body));
});

routerProductos.delete("/:id", async (req, res) => {
  let id = req.body;
  if (id) {
    res.status(200).json( await producto.deleteById(id));
    res.json({message : "Producto eliminado" })
  } else {
    res.status(500).json( await { message: "El número ingresado es menor a cero" });
  }
});

module.exports = routerProductos ;
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
