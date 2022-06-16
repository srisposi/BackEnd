const schemaUsuario = require("../models/ModelUsuario");
const bcrypt = require("bcrypt");
// const bcrypt = require("../utils/helpers/crypt");

class UsuarioDao {
  async getUser(email) {
    return await schemaUsuario.findOne({ email: email });
  }

  async getUserByEmailAndPassword(email, password) {
    return await schemaUsuario.findOne({ email: email, password: password });
  }

  async create(email, password, firstname, lastname) {
    let userCreated = await schemaUsuario.create({
      lastName: lastname,
      firstName: firstname,
      email: email,
      password: password,
    });

    return userCreated;
  }
}

module.exports = { UsuarioDao };
