require("dotenv").config();

let config = {
  port: process.env.PORT || 3101,
};

module.exports = { config };
