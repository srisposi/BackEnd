const mongoose = require("mongoose");
const schemaProducto = require("../models/ModelProducto");

const carritoSchema = mongoose.Schema({
	timeStamp: String,
    productos: [Object],
    id: String
})


module.exports = mongoose.model("Carrito", carritoSchema);
