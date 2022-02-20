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
  }

  async getAll() {
    try {
      return this.getTable();
    } catch (error) {
      console.log(error);
      return { "message": "Ocurrio un error" };
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
      return { "message": "Ocurrio un error" };
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(number) {
    try {
      return fs.promises
        .readFile(this.url_archivo, this.formatFile)
        .then((response) => {
          let jsonResponse = JSON.parse(response);
          return jsonResponse.find((elemento) => elemento.id === parseInt(number));
        });
    } catch (error) {
      console.log(error);
      return { "message": "Ocurrio un error" };
    }
  }

  //Función para actualizar un producto por id
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
  }


  //Función para elimiar buscando un id
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
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ServiceProductos;
