const res = require("express/lib/response");
const fs = require("fs");

class ContenedorProductos {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
  }

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

  //Función para agregar productos al listado
  async save(objeto) {
    try {
      const allData = await this.getAll();
      objeto.id = allData[allData.length - 1].id + 1;
      const newData = allData.concat(objeto);
      return fs.promises
        .writeFile(this.url_archivo, JSON.stringify(newData))
        .then((response) => {
        return (newData[newData.length - 1]);
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
          let jsonResponse = JSON.parse(response)
          console.log(jsonResponse)
          return jsonResponse.find((elemento) => elemento.id === parseInt(number));
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Función para actualizar un producto por id
  async updateById(idNumberUpdate, producto){
    try{
      return fs.promises
        .readFile(this.url_archivo, "urf-8")
        .then((response) => {
          response.find((elemento) => elemento === parseInt(idNumberUpdate));
          let jsonResponse = JSON.parse(response)
          jsonResponse[idNumberUpdate] = {
            producto
          }
        })
      } catch (error){
        console.log(error)
      }
  }


  //Función para elimiar buscando un id
  async deleteById(idNumber) {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          jsonResponse.find((elemento) => elemento === parseInt(idNumber));
          jsonResponse[idNumber] = [];
        });
    } catch (error) {
      console.log(error);
    }
  }
}

let primerProducto = new ContenedorProductos("../data/productos.txt");

//Probando Primera Función
// primerProducto.save({
//   title: "Compas",
//   price: 45.01,
// });

//Probando Tercera Función
primerProducto.getAll().then((response) => {
  console.log(response);
  var maxId = response.reduce(
    (max, responseID) => (responseID.id > max ? responseID.id : max),
    response[0].id
  );
  console.log(maxId);
});

module.exports = ContenedorProductos;
