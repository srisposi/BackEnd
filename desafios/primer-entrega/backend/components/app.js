const express = require("express");
let fs = require("fs");
let { config } = require("../config/config");
const app = express();
const path = require("path");
const PORT = config.port;
const routerCart = require("../routes/routerCarrito");
const routerProd = require("../routes/routerProductos");
const ADMIN = config.admin;
const ServiceProductos = require("../services/productos");
const { cwd } = require("process");
const cors = require("cors");

function adminValidation(res) {
}

console.log(cwd());
let services_function = new ServiceProductos("./data/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors({origin: '*'}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/index", async (req, res, next) => {
  // res.render("index", { titulo: "hola mundo", admin: ADMIN } );
  const productos = await services_function.getTable()
  res.render("index", {  productos: productos, admin: ADMIN } );
});

app.get("/health", (req, res, next) => {
  res.status(200).send({ message: "OK!" });
});

app.use("/api/productos", routerProd);
app.use("/api/carritos", routerCart);

app.listen(PORT, () => {
  console.log(`Estamos escuchando en está url: http://localhost:${PORT}`);
});
