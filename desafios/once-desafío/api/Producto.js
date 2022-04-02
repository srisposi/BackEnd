const fs = require('fs');

const { mariaDB } = require("../database/mariaDB")
const knex = require("knex")(mariaDB)

class Producto {
    constructor() {
        this.productos = [];
        this.id = 1;
    }

    listar() {
        (async () => {
            try {
                let response = await knex.from("productos");
                console.table(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }

    listar_id(productoId) {
        (async () => {
            try {
                let response = await knex.from("productos").where("id", "=", productoId);
                console.table(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }

    agregar(producto) {
        if (producto.price && producto.title && producto.thumbnail) {
            let objeto = {
                ...producto,
                id: this.id++
            }
            this.productos.push(objeto);
            fs.writeFileSync(__dirname + "/productos.txt", JSON.stringify(this.productos, null, '\t'));
            knex("productos").insert(producto)
                .then(() => console.log("Productos ingresados con Exito"))
                .catch((err) => { console.log(err); throw err })
                .finally(() => {
                    knex.destroy();
                })
        }
        else { return { error } }

    }

    update(productoId, body) {
        (async () => {
            try {
                await knex.from("productos").where("id", "=", productoId).update(body);
                console.log("Producto Modificado !!!");
            } catch (error) {
                console.log(error);
            }
        })();
    }


    borrar(productoId) {
        (async () => {
            try {
                let response = await knex.from("productos").where("id", "=", productoId).del();
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }
}

module.exports = Producto;