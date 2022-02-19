const express = require("express");
const { append } = require("express/lib/response");
const routerProductos = express.Router();
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

routerProductos.put("/:id", (req, res) => {
  let body = req.body;
  console.log(req);
  console.log(body);
 
  res.json(
    producto.updateById(id,{
      productos
    })
  );
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
