const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/productos", (req, res, next) => {
  res.json({ response: [] });
});

app.get("/api/productos/:id", (req, res, next) => {
  res.json({ response: [] });
});

app.post("/api/productos", (req, res, next) => {
  res.json({ response: [] });
});

app.put("/api/productos/:id", (req, res, next) => {
  res.json({ response: [] });
});

app.delete("/api/productos/:id", (req, res, next) => {
  res.json({ response: [] });
});

app.listen(PORT, () => {
  console.log(`Estamos escuchando en esta uri: http://localhost:${PORT}`);
});
