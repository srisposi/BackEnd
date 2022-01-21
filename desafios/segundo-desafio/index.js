const fs = require("fs");
class Contenedor {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
  }

  //Función Primera - Salvar objeto y obtener el id asignado
  async save(objeto) {
    try {
      const allData = await this.getAll();
      objeto.id = allData[allData.length-1].id + 1;
      const newData = allData.concat(objeto);
      return fs.promises
        .writeFile(this.url_archivo, JSON.stringify(newData))
        .then((response) => {
          return newData[newData.length-1];
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Función Segunda - Recive un id y devuelve el objeto con ese id o null si no está
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

  //Función Tercera - Devuelve un array con los objetos presentes en el archivo
  async getAll() {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          return JSON.parse(response);
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Función Quarta - para elimiar buscando un id
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

  //Función Quinta - para eliminar todo
  async deleteAll() {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          response.data = [];
        });
    } catch (error) {
      console.log(error);
    }
  }
}

let primerProducto = new Contenedor("./productos.txt");

//Probando Primera Función
primerProducto.save({
  title: "Compas",
  price: 45.01,
});

// //Probando Segunda Función
// console.log(primerProducto.getById(3));

//Probando Tercera Función
primerProducto.getAll().then((response) => {
  console.log(response);
  let maxId = response.reduce(
    (max, responseID) => (responseID.id > max ? responseID.id : max),
    response[0].id
  );
  console.log(maxId);
});

// //Probando Quarta Función
// primerProducto.deleteById(2);

// //Probando Quinta Función
// primerProducto.deleteAll();
