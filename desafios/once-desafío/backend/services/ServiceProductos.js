const { ProductoDao } = require("../daos/ProductoDaos");

class ServiceProductos {
  async getAll() {
    const productoDao = new ProductoDao();
    try {
      return await productoDao.getAll();
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para agregar productos al listado
  async save(objeto) {
    try {
      const productoDao = new ProductoDao();
      return await productoDao.create(objeto);
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(id) {
    try {
      const productoDao = new ProductoDao();
      return await productoDao.getById(id);
      
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para actualizar un producto por id
  async updateById(id, newObject) {
    try {
      const productoDao = new ProductoDao();
      return await productoDao.update(id, newObject);
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para elimiar buscando un id
  async deleteById(id) {
    try {
      const productoDao = new ProductoDao();
      await productoDao.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ServiceProductos;
