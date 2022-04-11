const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const express_session = require("express-session");
let { Router } = require("express");
let router = new Router();
let testingController = require("./components/Faker/controllers/Controller");
const port = 8086;
let secret_session = "secret";

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

app.use(express_session({
  secret: secret_session,
  resave: true,
  saveUniinitial: true,
}
));

const getName = req => req.session.name || '';

app.get("/", (req, res, next)=> {
  let { name } = req.query;
  if(name){
      res.send(`<h1>Hola ${getName(req)}, bienvenido!!!</h1>`);
  }
  res.send("Todo ok!");
});

app.get("/olvidar", (req, res, next) => {
  let name = getName(req);
  req.session.destroy(err=> {
      if(err) res.json({"error": JSON.stringify(err)});
      res.send(`Hasta luego ${name}`);
  })
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

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
