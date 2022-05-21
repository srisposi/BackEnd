const mongoose = require("mongoose");

const productosSchema = mongoose.Schema({
	timestamp: String,
    nombre: String,
    precio: String,
    descripcion: String,
    codigo: String,
    foto: String,
    stock: String,
    id: String
})


module.exports = mongoose.model("Producto", productosSchema);
