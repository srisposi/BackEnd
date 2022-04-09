const { mariaDB } = require("./database/mariaDB")
const knex = require("knex")(mariaDB)

knex.schema.createTable("productos", table => {
    table.increments("id")
    table.string("title")
    table.integer("price")
    table.string("thumbnail")
})
    .then(() => console.log("Tabla Creada con Exito"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    })
