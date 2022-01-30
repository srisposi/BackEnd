const express = require("express");
const app = express();
const PORT = 8080;

//Tenemos tres formas de pasar parámetros
//params, query y body

//==============Parte I==================================
app.get("/api/sumar/:num/:num", (req, res, next) => {
  let { num1, num2 } = req.params;
  res.json({
    response: `El total de la suma entre ${num1} y ${num2} es ${
      Number(num1) + Number(num2)
    }`,
  });
});

app.get("/api/sumar", (req, res, next) => {
  let { num1, num2 } = req.query;
  res.json({
    response: `El total de la suma entre ${num1} y ${num2} es ${
      Number(num1) + Number(num2)
    }`,
  });
});

app.get("/api/operacion/:op", (req, res, next) => {
  let { op } = req.params;
  let numbers = op.split("+");
  res.json({
    response: `El total de la suma entre ${numbers[0]} y ${numbers[1]} es ${
      Number(numbers[0]) + Number(numbers[1])
    }`,
  });
});

//============Parte II=============================
app.get("/api", (req, res, next) => {
  res.json({ response: "Todo ok desde GET" });
});

app.post("/api", (req, res, next) => {
  res.json({ response: "Todo ok desde POST" });
});

app.put("/api", (req, res, next) => {
  res.json({ response: "Todo ok desde PUT" });
});

app.delete("/api", (req, res, next) => {
  res.json({ response: "Todo ok desde DELETE" });
});

//=======================================================
app.listen(PORT, () => {
  console.log(`Estamos escuchando: http://localhost:${PORT}`);
});
