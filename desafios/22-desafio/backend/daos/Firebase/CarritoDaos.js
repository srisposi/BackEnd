const  { producto: schema } = require("../../models/Firebase/ModelProducto");

class CarritoDao {
    
    async getAll(){
        return await schema.find();
    }

    async getById(id){
        return await schema.findOne({id: id});
    }

    async create(entityToCreate){
        let entityCreated =  await schema.create({...entityToCreate});
        return entityCreated;
    }

    async update(id, entityToUpdate){
        await schema.updateOne({ id: id },{ ...entityToUpdate });
        return schema.find({id: id});
    }

    async delete(id) {
        let entityToDelete = await schema.findOne({id: id});
        await entityToDelete.remove();
    }
}

module.exports = { CarritoDao }