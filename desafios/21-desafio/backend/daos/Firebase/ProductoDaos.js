const { producto: schema } = require("../../models/Firebase/ModelProducto");

class ProductoDao {
  //Listar todos los productos
  async getAll() {
    let doc = await schema.get(); 
    let db_array_productos = [];
        
    doc.forEach(element => {
        db_array_productos.push({id:element.id, ...element.data()});
    })
    return db_array_productos;
  }

  async getById(id) {
    return await schema.getById(id);
  }

  async create(entityToCreate) {
    let entityCreated = await schema.create({ ...entityToCreate });
    return entityCreated;
  }

  async update(id, entityToUpdate) {
    await schema.updateOne({ _id: id }, { ...entityToUpdate });
    return schema.findById(id);
  }

  async delete(id) {
    await schema.findByIdAndDelete(id);
  }
}

module.exports = { ProductoDao };
