import express from "express";

// middlewares
import bodyParser from "body-parser";
import cors from "cors";

// typeorm related imports
import "reflect-metadata";
import { createConnection } from "typeorm";

import dotenv from "dotenv";

// router imports
import book from "./book";

dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || "development";

export async function createApp() {
  let retires = 5;

  while (retires > 0) {
    try {
      await createConnection();
      break;
    } catch (err) {
      console.log(err);
      console.log("connection to db failed. retires left %d", retires);
      retires -= 1;
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));
    }
  }

  // await connection.query("CREATE DATABASE booksdb IF NOT EXISTS");

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/api/v1/", book());
  app.get("/", (req, res) => res.send("hello"));

  return app;
}

const promise = createApp();

promise.then((app) => {
  app.listen(PORT, () => {
    console.log("Starting %s environment ...", NODE_ENV);
    console.log("Server listening at port http://localhost:%d/", PORT);
  });
});
