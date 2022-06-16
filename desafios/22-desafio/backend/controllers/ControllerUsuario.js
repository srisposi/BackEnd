const express = require("express");
const routerUsuario = express.Router();
const { config } = require("../config");
const ServiceUsuario = require("../services/ServiceUsuario");
const UnauthorizeException = require("../exceptions/UnauthorizeException");
let Singleton = require("../utils/redis/singleton");

let serviceUsuario = new ServiceUsuario();
let singleton = new Singleton();

routerUsuario.post("/register", async (req, res) => {
  try {
    let usuario = req.body;
    res
      .status(201)
      .json(
        await serviceUsuario.createUsuario(
          usuario.email,
          usuario.password,
          usuario.firstname,
          usuario.lastname
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerUsuario.post("/signIn", async (req, res) => {
  try {
    let { email, password } = req.body;
    let token = await serviceUsuario.getToken(email, password);
    res.status(200).json(token);
  } catch (error) {
    if (error instanceof UnauthorizeException)
      res.status(400).json({ message: error.message });
    else res.status(500).json({ message: error.message });
  }
});

routerBaseRedis.get("/singleton", (req, res) => {
  try {
    console.log("entrando");
    res.json({ fecha: singleton.fecha });
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerUsuario;
