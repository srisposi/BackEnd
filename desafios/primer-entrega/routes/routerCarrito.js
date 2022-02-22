const express = require("express");
const { append } = require("express/lib/response");
const routerCarrito = express.Router();
const Contenedor = require("../services/carrito");

let contenedor = new Contenedor("../data/carrito.txt");

const carrito = new routerCarrito();

carrito.get("/:id", (req, res, next) => {
  let { id } = req.params;
  let response = null;
  if (response) {
    res.json(contenedor.getById(id))
  } else {
    res.json({ message: "No existe productos" });
  }
});

routerCarrito.post("/", (req, res) => {
  res.redirect("/");
});

routerCarrito.post("/:id", (req, res) => {
  res.redirect("/");
});

routerCarrito.delete("/:id", (req, res) => {
  res.json(response);
});

routerCarrito.delete("/:id_prod", (req, res) => {
  res.json(response);
});

app.use("/api/carritos", routerCarrito);


module.exports = { routerCarrito, producto };
