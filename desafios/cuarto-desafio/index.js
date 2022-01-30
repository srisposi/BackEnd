const productos = require("./ClaseProducto");
const express = require("express");
const app = express();
const PORT = 8080;
let primerProducto = new Contenedor("./productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/productos", (req, res, next) => {
  res.json(primerProducto.getAll());
});

app.get("/api/productos/:id", (req, res, next) => {
  let { id } = req.params;
  let response = null;
  if (response) {
    res.json(primerProducto.getById(id));
  } else {
    res.json({ message: "No existe el id cargado" });
  }
});

app.post("/api/productos", (req, res, next) => {
  let { productos } = req.body;

  res.json(
    primerProducto.save({
      title: productos,
    })
  );
});

app.put("/api/productos/:id", (req, res, next) => {
  let { productos } = req.body;

  res.json(
    primerProducto.save({
      title: productos,
    })
  );
});

app.delete("/api/productos/:id", (req, res, next) => {
  let { id } = req.body;
  if (0 < id < productos.length) {
    res.json(primerProducto.deleteById(id));
  } else {
    res.json({ message: "El número ingresado es menor a cero" });
  }
});

app.listen(PORT, () => {
  console.log(`Estamos escuchando en esta uri: http://localhost:${PORT}`);
});
