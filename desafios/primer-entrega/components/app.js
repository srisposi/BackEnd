const express = require("express");
let fs = require("fs");
let { config } = require("/config");
const app = express();
const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("template", "ejs");
app.set("views", __dirname + "/primer-entrega/views/templates");

app.get("/health", (req, res, next) => {
  res.status(200).send({ message: "OK!" });
});

app.listen(PORT, () => {
  console.log(`Estamos escuchando en está url: http://loclahost:${PORT}`);
});
