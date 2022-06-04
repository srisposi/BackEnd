const { json } = require("express/lib/response");
const { UsuarioDao } = require("../daos/UsuarioDaos");
const UnauthorizeException = require("../exceptions/UnauthorizeException");
const bcrypt = require("bcrypt");
class ServiceUsuario {
  encodePassword(password) {
    let newPassword = this.encode64(password);
    return newPassword;
  }

  encode64(token) {
    let buff = new Buffer(token);
    let base64data = buff.toString("base64");
    return base64data;
  }

  decode64(token) {
    let buff = new Buffer(token, "base64");
    let text = buff.toString("ascii");
    return text;
  }

  async getUserByToken(token) {
    try {
      const usuarioDao = new UsuarioDao();
      let data = this.decode64(token); //user:password
      const email = data.split(":")[0];
      const password = data.split(":")[1];

      const usuario = await usuarioDao.getUserByEmailAndPassword(
        email,
        password
      );

      return usuario;
    } catch (error) {
      return null;
    }
  }

  async createUsuario(email, password, firstname, lastname) {
    try {
      const usuarioDao = new UsuarioDao();
      const usuario = await usuarioDao.getUser(email);

      if (!usuario) {
        return await usuarioDao.create(
          email,
          this.encodePassword(password),
          firstname,
          lastname
        );
      } else {
        return { message: "User already exist" };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getToken(email, password) {
    const usuarioDao = new UsuarioDao();
    const usuario = await usuarioDao.getUserByEmailAndPassword(
      email,
      this.encodePassword(password)
    );

    if (usuario) {
      let tokenResponse = this.encode64(
        `${email}:${this.encodePassword(password)}`
      );
      //verify token
      console.log(this.decode64(tokenResponse));
      const user = await this.getUserByToken(tokenResponse);
      console.log(user);

      return tokenResponse;
    } else {
      throw new UnauthorizeException("Not allowed");
    }
  }
}

module.exports = ServiceUsuario;
