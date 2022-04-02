let { schema, normalize, denormalize } = require("normalizr")
const fs = require('fs');
let inspect = require("../utils/inspect");
const { sqLite3 } = require("../database/sqlite3")
const knex = require("knex")(sqLite3)

const authorSchema = new schema.Entity('author', {})

const textSchema = new schema.Entity('mensajes', {
    author: authorSchema
}, { idAttribute: 'timestamp' })

const schemaMensajes = new schema.Entity('allmensajes', {
    mensajes: [textSchema]
}, { idAttribute: "id" });

const paraNormalizr = []

class Mensajes {
    constructor() {
        this.mensajes = [];
        this.id = 1;

    }

    leerMensajes() {
        try {
            let contenido = fs.readFileSync(__dirname + '/chat.txt', 'utf-8');


            if (contenido) {
                this.mensajes = JSON.parse(contenido);
                (async () => {
                    try {
                        let response = await knex.from("mensajes");
                        // console.table(response);





                    } catch (error) {
                        console.log(error);
                    }
                })();
                return this.mensajes;
            } else { throw new Error("No hay contenido") }
        }
        catch (e) {
            console.log("Entro a error por no existir mensajes anteriores")
            let fecha = (new Date()).toLocaleString();
            let defaultMensaje = { author: 'Admin', text: 'Bienvenidos', date: fecha }
            this.mensajes.push(defaultMensaje);
            fs.appendFileSync(__dirname + '/chat.txt', JSON.stringify(this.mensajes, null, '\t'))
            return this.mensajes;
        }
    }

    guardarMensajes(mensaje) {

        this.mensajes.push(mensaje);
        console.log("MENSAJE INGRESADO", mensaje)
        fs.writeFileSync(__dirname + "/chat.txt", JSON.stringify(this.mensajes, null, '\t'));

        let objeto = {
            ...mensaje,
            id: this.id++
        }
        paraNormalizr.push(objeto)

        ///// USO REDUCE PARA PASAR DE ARRAY A OBJETO
        const result = paraNormalizr.reduce((accumulator, element, index) => ({
            ...accumulator,
            [element.id]: element
        }), {});

        let normalizardo = normalize(result, schemaMensajes)
        // inspect(normalizardo)

        console.log("longitud normal", JSON.stringify(result).length)
        console.log("Longitud normalizardo", JSON.stringify(normalizardo).length)
        let ln = JSON.stringify(result).length;
        let lnz = JSON.stringify(normalizardo).length;
        console.log("COMPRESION Normalizada ----->", (lnz * 100) / ln);


        // knex("mensajes").insert(mensaje)
        //     .then(() => console.log("Mensaje ingresado con Exito"))
        //     .catch((err) => { console.log(err); throw err })
        //     .finally(() => {
        //         knex.destroy();
        //     })
    }
}

module.exports = Mensajes;