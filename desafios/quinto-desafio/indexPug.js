const express = require("express");
const app = express();
const archivoLocal = "./productos.txt";
const fs = require("fs");

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");
app.set("views", __dirname + "/Clase5/views");

app.get("/", (req, res) => {
  res.render("formulario.pug");
});

app.get("/productos/", (req, res) => {
  fs.promises.readFile(archivoLocal).then((data) => {
    parsedItems = JSON.parse(data);
    let productos = [];
    parsedItems.forEach((element) => {
      productos.push(element);
    });
    let comprueboListaVacia = productos.length !== 0;
    res.render("listado.pug", {
      existenProductos: comprueboListaVacia,
      productos: productos,
    });
  });
});

app.post("/productos/", (req, res) => {
  let productosAgregar = req.body;
  let productos = [];
  fs.promises.readFile(archivoLocal).then((data) => {
    parsedItems = JSON.parse(data);
    parsedItems.forEach((element) => {
      productos.push(element);
    });
    let productoAgregado = { ...productosAgregar, id: productos.length + 1 };
    productos.push(productoAgregado);
    let respuesta = fs.promises.writeFile(
      archivoLocal,
      JSON.stringify(productos, null, "\t")
    );
  });
  res.redirect("/");
});

// ESCUCHAMOS EL PUERTO ACTIVO
const server = app.listen(PORT, () => {
  console.log(`Server activo en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(error));
