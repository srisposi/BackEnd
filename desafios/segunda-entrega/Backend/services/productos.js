const fs = require("fs");

class ServiceProductos {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
    this.formatFile = "utf-8";
    this.table = "productos";
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

  //Función para agregar productos al listado
  async save(objeto) {
    try {
      const tableData = await this.getTable();
      objeto.id = tableData[tableData.length - 1].id + 1;
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
        return response.find((x) => x.id == id);
      });
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para actualizar un producto por id
  async updateById(id, newObject) {
    try {
      return this.getTable()
        .then((response) => {
          console.log(response);
          const result = response.map((oldObject) => {
            if (oldObject.id == id) {
              newObject["id"] = id;
              return newObject;
            } else {
              return oldObject;
            }
          });
          return result;
        })
        .then((result) => {
          return this.saveTable(result)
            .then(() => {
              return newObject;
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
        return this.saveTable(newData)
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ServiceProductos;
