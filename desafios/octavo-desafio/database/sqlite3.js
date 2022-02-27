const sqlite3 = {
  client: "sqlite3",
  connection: {
    filename: "./DB/ecommerce.sqlite",
  },
  userNullAsDefault: true,
};

module.exports = { sqlite3 };
