const express = require("express");
const { append } = require("express/lib/response");
const routerProductos = express.Router();
const { Router } = express;
const ContenedorProductos = require("../services/productos");

let producto = new ContenedorProductos("/home/srisposi/Documents/coderhouse/primer-entrega/data/db2.json");

routerProductos.get("/:id", async (req, res) => {
  console.log("routerProductos")
  let { id } = req.params;
  console.log(id)
  res.status(200).json(await producto.getById(id));
});

routerProductos.post("/", (req, res) => {
  let { productos } = req.body;
  
  res.json(
    producto.save({
      nombre: productos,
    })
  )
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

routerProductos.delete("/:id", (req, res) => {
  let { id } = req.body;
  if (0 < i < routerProductos.length) {
    res.json(producto.deleteById(id));
  } else {
    res.json({ message: "El número ingresado es menor a cero" });
  }
});

module.exports = routerProductos ;
