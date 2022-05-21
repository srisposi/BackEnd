const schema = require("../models/ModelProducto");
const mongoose = require("mongoose");

class ProductoDao {
  async getAll() {
    return await schema.find();
  }

  async getById(id) {
    return await schema.findById(id);
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
