import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";

import typeDefs from "./TypeDefs.js";
import resolvers from "./Resolvers.js";
import connectDB from "./config/db.js";


async function initServer() {
  const app = express();

  app.use(cors());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Server is running!");
  });

  connectDB();  

  // SERVER UP
  app.listen({ port: 4200 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4200${server.graphqlPath}`
    );
  });
}


initServer()
