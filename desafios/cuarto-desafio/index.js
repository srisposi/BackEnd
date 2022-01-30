const productos = require("./ClaseProducto");
const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
let primerProducto = new Contenedor("./productos.txt");
let routerProductos = new Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerProductos.get("/", (req, res, next) => {
  res.json(primerProducto.getAll());
});

routerProductos.get("/:id", (req, res, next) => {
  let { id } = req.params;
  let response = null;
  if (response) {
    res.json(primerProducto.getById(id));
  } else {
    res.json({ message: "No existe el id cargado" });
  }
});

routerProductos.post("/", (req, res, next) => {
  let { productos } = req.body;

  res.json(
    primerProducto.save({
      title: productos,
    })
  );
});

routerProductos.put("/:id", (req, res, next) => {
  let { productos } = req.body;

  res.json(
    primerProducto.save({
      title: productos,
    })
  );
});

routerProductos.delete("/:id", (req, res, next) => {
  let { id } = req.body;
  if (0 < id < productos.length) {
    res.json(primerProducto.deleteById(id));
  } else {
    res.json({ message: "El número ingresado es menor a cero" });
  }
});

app.use("/api/productos", routerProductos);

app.listen(PORT, () => {
  console.log(`Estamos escuchando en esta uri: http://localhost:${PORT}`);
});
