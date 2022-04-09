const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let { Router } = require("express");
let router = new Router();
let testingController = require("./components/Faker/controllers/Controller");

app.use(express.static(__dirname + "/public"));

const Mensajes = require("./api/Mensajes");
const { routerProductos, producto } = require("./routes/routerProductos");

const PORT = 8080;
const mensajes = new Mensajes();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerProductos);

app.get("/", (req, res) => {
  res.sendFile("index");
});

app.use("/", router);
router.get("/productos-test/", testingController.test);
router.get("/productos-test/:cant([0-9]+)", testingController.get);

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  let contenido = mensajes.leerMensajes();
  let comprobacion = producto.productos.length !== 0;

  socket.emit("content", {
    hayProductos: comprobacion,
    productos: producto.productos,
  });

  socket.emit("messages", contenido);

  socket.on("contentSent", () => {
    let comprobacion = producto.productos.length !== 0;
    io.sockets.emit("content", {
      hayProductos: comprobacion,
      productos: producto.productos,
    });
  });
  socket.on("new-message", function (data) {
    mensajes.guardarMensajes(data);
    io.sockets.emit("messages", mensajes.leerMensajes());
  });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});
