let faker = require("faker");
faker.locale = "es";
let respuesta = [];

class Testing {
    constructor() {
    }
    async getUsers(cant) {
        try {
            for (let i = 0; i < cant; i++) {
                const obj = {
                    id: i + 1,
                    precio: faker.commerce.price(),
                    title: faker.commerce.product(),
                    image: faker.image.fashion(),
                }
                respuesta.push(obj);
            }
            console.table(respuesta)
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Testing();