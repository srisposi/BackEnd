const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

const Mensajes = require("./api/mensajes");
const { routerProductos, producto } = require("./routes/routerProductos");

const PORT = 8080;
const mensajes = new Mensajes();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerProductos);

app.get("/", (req, res) => {
  res.sendFile("index");
});

io.on("connection", (socket) => {
  console.log("alguien se conectó");
  let contenido = mensajes.leerMensajes();
  let comprobacion = producto.productos.length !== 0;

  socket.emit("content", {
    productExist: comprobacion,
    products: producto.productos,
  });

  socket.emit("messages", contenido);

  socket.on("contentSent", () => {
    let comprobacion = producto.productos.length !== 0;
    io.sockets.emit("content", {
      productExist: comprobacion,
      products: producto.productos,
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
