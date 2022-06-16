const express = require("express");
const res = require("express/lib/response");
const req = require("express/lib/request");
const routerProductos = express.Router();
let { config } = require("../config");
const ServiceProductos = require("../services/ServiceProductos");
const ADMIN = config.admin;
const ServiceUsuario = require("../services/ServiceUsuario");

let producto = new ServiceProductos();
let usuario = new ServiceUsuario();

async function adminValidation(req, res) {
  let auth = req.headers.auth;
  let user = await usuario.getUserByToken(auth);
  if (!user) return res.status(400).json({ message: "Invalid user" });
}

routerProductos.get("/", async (req, res) => {
  res.status(200).json(await producto.getAll());
});

routerProductos.get("/:id", async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await producto.getById(id));
});

routerProductos.post("/", async (req, res) => {
  await adminValidation(req, res);
  let newProducto = req.body;
  return res.status(200).json(await producto.save(newProducto));
});

routerProductos.put("/:id", async (req, res) => {
  await adminValidation(req, res);
  let { id } = req.params;
  let newProducto = req.body;
  res.status(200).json(await producto.updateById(id, newProducto));
});

routerProductos.delete("/:id", async (req, res) => {
  await adminValidation(req, res);
  let { id } = req.params;
  await producto.deleteById(id);
  res.status(200).json("Producto eliminado");
});

module.exports = routerProductos;
