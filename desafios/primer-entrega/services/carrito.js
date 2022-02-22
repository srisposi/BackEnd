const fs = require("fs");

class Contenedor {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
  }

  //Función para agregar productos al listado
  async save(objeto) {
    try {
      const allData = await this.getAll();
      objeto.id = allData[allData.length - 1].id + 1;
      const newData = allData.concat(objeto);
      return fs.promises
        .writeFile(this.url_archivo, JSON.stringify(newData))
        .then((response) => {
          return newData[newData.length - 1];
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(number) {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          return response.find((elemento) => elemento == number);
        });
    } catch (error) {
      console.log(error);
    }
  }



  //Función para elimiar buscando un id
  async deleteById(idNumber) {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          response.find((elemento) => elemento == idNumber);
          response.data[idNumber] = {};
        });
    } catch (error) {
      console.log(error);
    }
  }
}

let primerProducto = new Contenedor("../filesystem/carrito.txt");

//Probando Primera Función
primerProducto.save({
  title: "Compas",
  price: 45.01,
});

//Probando Tercera Función
primerProducto.getAll().then((response) => {
  console.log(response);
  let maxId = response.reduce(
    (max, responseID) => (responseID.id > max ? responseID.id : max),
    response[0].id
  );
  console.log(maxId);
});

module.exports = Contenedor;
