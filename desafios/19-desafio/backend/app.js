const express = require("express");
let fs = require("fs");
let { config } = require("./config");
const app = express();
const path = require("path");
const routerCart = require("./controllers/ControllerCarrito");
const routerProd = require("./controllers/ControllerProductos");
const routerUser = require("./controllers/ControllerUsuario");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://root:coderhouse@cluster0.znqdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + "/public"));
    app.use(cors(`${config.cors}`));

    app.get("/api/health", (req, res, next) => {
      res.status(200).send({ message: "OK!" });
    });

    app.use("/api/productos", routerProd);

    app.use("/api/carritos", routerCart);

    app.use("/api/usuario", routerUser);

    app.listen(config.port, () => {
      console.log(
        `Estamos escuchando en está url: http://localhost:${config.port}`
      );
    });
  });
