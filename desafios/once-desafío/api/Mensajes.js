const fs = require("fs");

const { sqLite3 } = require("../database/sqlite3");
const knex = require("knex")(sqLite3);

class Mensajes {
  constructor() {
    this.mensajes = [];
  }

  leerMensajes() {
    try {
      let contenido = fs.readFileSync(__dirname + "/chat.txt", "utf-8");
      if (contenido) {
        this.mensajes = JSON.parse(contenido);
        (async () => {
          try {
            let response = await knex.from("mensajes");
            console.table(response);
          } catch (error) {
            console.log(error);
          }
        })();
        return this.mensajes;
      } else {
        throw new Error("No hay contenido");
      }
    } catch (e) {
      console.log("Entro a error por no existir mensajes anteriores");
      let fecha = new Date().toLocaleString();
      let defaultMensaje = {
        author: "Admin",
        text: "Bienvenidos",
        date: fecha,
      };
      this.mensajes.push(defaultMensaje);
      fs.appendFileSync(
        __dirname + "/chat.txt",
        JSON.stringify(this.mensajes, null, "\t")
      );
      return this.mensajes;
    }
  }

  guardarMensajes(mensaje) {
    this.mensajes.push(mensaje);
    console.log("MENSAJE", mensaje);
    fs.writeFileSync(
      __dirname + "/chat.txt",
      JSON.stringify(this.mensajes, null, "\t")
    );
    knex("mensajes")
      .insert(mensaje)
      .then(() => console.log("Mensaje ingresado con Exito"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
}

module.exports = Mensajes;
