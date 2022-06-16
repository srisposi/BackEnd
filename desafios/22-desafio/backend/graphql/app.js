const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://root:coderhouse@cluster0.znqdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Welcome to my api");
    });

    async function start() {
      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
      });

      await apolloServer.start();
      apolloServer.applyMiddleware({ app, path: "/api" });

      app.use((req, res, next) => {
        res.status(404).send("not found");
      });

      app.listen(process.env.PORT || 3002, () =>
        console.log("Server on port", process.env.PORT || 3002)
      );
    }

    start();
  });
