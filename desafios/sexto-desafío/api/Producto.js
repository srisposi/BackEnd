const fs = require("fs");

class Producto {
  constructor() {
    this.productos = [];
    this.id = 1;
  }

  listar() {
    if (this.productos.length === 0) {
      return { error: "sin productos cargados" };
    } else {
      return this.productos;
    }
  }

  listar_id(productoId) {
    let producto = this.productos.find(
      (element) => element.id === parseInt(productoId)
    );
    if (producto) {
      return producto;
    } else {
      return { error: "No se encontro el producto" };
    }
  }

  agregar(producto) {
    if (producto.price && producto.title && producto.thumbnail) {
      let objeto = { ...producto, id: this.id++ };
      this.productos.push(objeto);
      fs.writeFileSync(
        __dirname + "/productos.txt",
        JSON.stringify(this.productos, null, "\t")
      );
      return objeto;
    } else {
      return { error };
    }
  }

  update(productoId, body) {
    let producto = this.productos.find(
      (element) => element.id === parseInt(productoId)
    );
    if (producto) {
      this.productos[productoId - 1] = { ...body, id: parseInt(productoId) };
      return this.productos[productoId - 1];
    } else {
      return { error: "producto no encontrado" };
    }
  }

  borrar(productoId) {
    let producto = this.productos.find(
      (element) => element.id === parseInt(productoId)
    );
    if (producto) {
      let productoEliminado = this.productos[productoId - 1];
      this.productos.splice(productoId - 1, 1);
      return productoEliminado;
    } else {
      return { error: "producto no encontrado" };
    }
  }
}

module.exports = Producto;
