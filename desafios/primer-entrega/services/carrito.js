const fs = require("fs");
const UUID = require("uuidjs");
const ServiceProductos = require("./productos");
// const moment = require('moment');
// const dateNow = Date.now();
class ServiceCarrito {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
    this.formatFile = "utf-8";
    this.table = "carrito";
    this.productoServices = new ServiceProductos("./data/db.json");
  }

  async getDb() {
    return fs.promises
      .readFile(this.url_archivo, this.formatFile)
      .then((response) => {
        let jsonResponse = JSON.parse(response);
        return jsonResponse;
      });
  }

  async getTable() {
    return this.getDb().then((response) => {
      return response[this.table];
    });
  }

  async saveTable(newTableData) {
    this.getDb().then((response) => {
      response[this.table] = newTableData;
      return fs.promises
        .writeFile(this.url_archivo, JSON.stringify(response))
        .then(() => {
          return newTableData;
        });
    });
  }

  async getAll() {
    try {
      return this.getTable();
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  getUiid() {
    return UUID.genV4().hexString;
  }

  //Función para crear carrito y devolver id
  async createCarrito() {
    try {
      let carrito = {
        id: this.getUiid(),
        timeStamp: Date.now(),
        producto: [],
      };
      return this.save(carrito).then(() => {
        return carrito;
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Función para agregar productos al listado
  async save(objeto) {
    try {
      const tableData = await this.getTable();
      const newData = tableData.concat(objeto);

      return this.saveTable(newData).then(() => {
        return objeto;
      });
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(id) {
    try {
      return this.getTable().then((response) => {
        let dataResponse = response.find((x) => x.id == id);
        if(!dataResponse){
          throw "No se encontró";
        } 
        return this.getDb().then((response) => {
          let productos = response.productos;
          dataResponse.producto = dataResponse.producto.map((x) => {
            return productos.find(element => element.id == x)
          });
          return dataResponse;
        });
      })
      .catch((err) => {
        return { message: `Ocurrio un error ${err}` };          
      });
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para actualizar un producto por id
  async updateById(id, idProd) {
    try {
      let dataResponse = null;
      return this.getTable()
        .then((response) => {
          const result = response.map((oldObject) => {
            if (oldObject.id == id) {
              oldObject["producto"].push(idProd);
              dataResponse = oldObject;
              return oldObject;
            } else {
              return oldObject;
            }
          });
          return result;
        })
        .then((result) => {
          return this.saveTable(result)
            .then(() => {
              return dataResponse;
            })
            .catch((err) => {
              console.log(err);
              return { message: "Ocurrio un error" };
            });
        });
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para elimiar buscando un id
  async deleteById(id) {
    try {
      return this.getTable().then((response) => {
        let newData = [];
        response.forEach((element) => {
          if (element.id != id) {
            newData.push(element);
          }
        });
        return this.saveTable(newData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      return this.getTable().then((response) => {
        response = [];
        return this.saveTable(response);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ServiceCarrito;
