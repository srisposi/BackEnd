let personasDB = require("../daos/personaDaoMem");
let DTO = require("./DTO/index");
class Personas {
  async getAll() {
    let personas = await personasDB.getAll();
    let res = DTO.getPersonas(perosnas);
    return res;
  }
  async create(obj) {
    return await personasDB.create(obj);
  }
}

module.exports = new Personas();
