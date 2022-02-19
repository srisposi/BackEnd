# Proyecto en CoderHouse - Primera entrega

# Ecommerce Backend

# Cómo iniciar el proyecto

- npm init -y
- npm i express
- npm i nodemon -D
- npm i dotenv (levanta las variables de entorno)

creación de los scripts en el package.json

- "dev": "nodemon index.js"
- "start": "node index.js"

creación del motor de plantilla EJS

- npm install ejs

configuración

let ejs = require("ejs")

app.set("views", "./views/pages/ejs");
app.set("view engine", "ejs");

res.render('pages/index')
