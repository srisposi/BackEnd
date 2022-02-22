const express = require("express");
let fs = require("fs");
let { config } = require("../config/config");
const app = express();
const path = require("path");
const PORT = config.port;
const routerProd = require("../routes/routerProductos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/index", (req, res, next) => {
  res.render("index");
});

app.get("/health", (req, res, next) => {
  res.status(200).send({ message: "OK!" });
});

app.use("/api/productos", routerProd);

app.listen(PORT, () => {
  console.log(`Estamos escuchando en está url: http://localhost:${PORT}`);
});
