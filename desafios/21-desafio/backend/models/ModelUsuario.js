const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  lastName: { type: String },
  firstName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  signUpDate: { type: Date, default: Date.now() },
  lastLogin: Date,
});

module.exports = mongoose.model("Usuario", usuarioSchema);
