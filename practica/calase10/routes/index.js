module.export = (app) => {
  app.get("/", (req, res, next) => {
    res.send("Todo OK!");
  });
};
