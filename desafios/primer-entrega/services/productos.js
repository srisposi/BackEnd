<<<<<<< HEAD
const fs = require("fs");

class ServiceProductos {

  constructor(url_archivo) {
    this.url_archivo = url_archivo;
    this.formatFile = "utf-8";
    this.table = "productos";
  }

  async getDb(){
    return fs.promises
        .readFile(this.url_archivo, this.formatFile)
        .then((response) => {
          let jsonResponse = JSON.parse(response);
          return jsonResponse;
        });
  }

  async getTable(){
    return this.getDb().then((response) => {
      return response[this.table];
    })
  }

  async saveTable(newTableData) {
    this.getDb().then((response) => {
      response[this.table] = newTableData;
      return fs.promises.writeFile(this.url_archivo, JSON.stringify(response)).then(() => {
        return newTableData;
      });
    })
=======
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const fs = require("fs");

class ContenedorProductos {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
  }

  async getAll() {
    try {
<<<<<<< HEAD
      return this.getTable();
    } catch (error) {
      console.log(error);
      return { "message": "Ocurrio un error" };
    }
  }
=======
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          return JSON.parse(response);
        });
    } catch (error) {
      console.log(error);
    }
  } 
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4

  //Función para agregar productos al listado
  async save(objeto) {
    try {
<<<<<<< HEAD
      const tableData = await this.getTable();
      objeto.id = tableData[tableData.length - 1].id + 1;
      const newData = tableData.concat(objeto);

      return this.saveTable(newData).then(() => {
        return objeto;
      });

    } catch (error) {
      console.log(error);
      return { "message": "Ocurrio un error" };
=======
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
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(number) {
    try {
      return fs.promises
<<<<<<< HEAD
        .readFile(this.url_archivo, this.formatFile)
        .then((response) => {
          let jsonResponse = JSON.parse(response);
=======
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          console.log(jsonResponse)
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
          return jsonResponse.find((elemento) => elemento.id === parseInt(number));
        });
    } catch (error) {
      console.log(error);
<<<<<<< HEAD
      return { "message": "Ocurrio un error" };
=======
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
    }
  }

  //Función para actualizar un producto por id
<<<<<<< HEAD
  async updateById(id, newObject) {
    try {
      return fs.promises
        .readFile(this.url_archivo, this.formatFile)
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          const result = jsonResponse.map((oldObject) => {
            if (oldObject.id == id) {
              newObject["id"] = id;
              throw "boom";
              return newObject;
            }
            else
            {
              return oldObject;
            }
          });
          
          return fs.promises.writeFile(this.url_archivo, JSON.stringify(result))
            .then(() => {
              return newObject;
            });
        })
        .catch((err) => {
          console.log(err);
          return { "message": "Ocurrio un error" };
        });
    } catch (error) {
      console.log(error);
      return { "message": "Ocurrio un error" };
    }
=======
  async updateById(id, newProducto){
    try{
      return fs.promises
        .readFile(this.url_archivo, "urf-8")
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          const result = jsonResponse.map((prod) => {
            if (prod.id === id){
              prod = newProducto;
            }
          })
          console.log(result);
          return (result)
        })
        .writeFile(this.url_archivo, JSON.stringify(result))
      } catch (error){
        console.log(error)
      }
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
  }


  //Función para elimiar buscando un id
<<<<<<< HEAD
  async deleteById(id) {
    try {
      return fs.promises
        .readFile(this.url_archivo, this.formatFile)
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          let newData = [];
          jsonResponse.forEach(element => {
            if(element.id != id){
              newData.push(element);
            }
          });
          return fs.promises.writeFile(this.url_archivo, JSON.stringify(newData));
=======
  async deleteById(idNumber) {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          let jsonResponse = JSON.parse(response)
          jsonResponse.find((elemento) => elemento === parseInt(idNumber));
          jsonResponse[idNumber] = [];
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
        });
    } catch (error) {
      console.log(error);
    }
  }
}

<<<<<<< HEAD
module.exports = ServiceProductos;
=======
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
>>>>>>> 32035b6bb82addc0390b9d34358cb26a9963bab4
