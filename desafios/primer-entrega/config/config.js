require("dotenv").config();

let config = {
  port: process.env.PORT || 3101,
  admin: true,
};


module.exports = { config };
