require("dotenv").config();

let config = {
  port: process.env.PORT || 8080,
  admin: true,
};


module.exports = { config };
