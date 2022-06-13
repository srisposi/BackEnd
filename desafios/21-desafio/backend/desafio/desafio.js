const { default: axios } = require("axios");
let { config } = require("../config");

//Probando el got
async () => {
  try {
    let res = await got("https://jsonplaceholder.typicode.com/posts");
    console.log(JSON.parse(res.body));
  } catch (error) {
    console.log(error);
  }
};

//Probando llamadas axios
async function getProductos() {
  try {
    let res = await axios.get(`http://localhost:${config.port}/api/productos`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function getCarrito() {
  try {
    let res = await axios.get(`http://localhost:${config.port}/api/carrito`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function getUsuario() {
  try {
    let res = await axios.post(`http://localhost:${config.port}/api/usuario`, {
      number,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  console.log("Obteniendo datos...");
  getProductos();
  getCarrito();
  getUsuario();
}, 2000);
