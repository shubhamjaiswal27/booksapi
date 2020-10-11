import express from "express";
import { makeValidateBody } from "express-class-validator";

import { BookController } from "./book.controller";

import { BookDto } from "./book.dto";

export default () => {
  const router = express.Router();

  const controller = new BookController();

  router.get("/books", (req, res) => controller.all(req, res));
  router.get("/books/:id", (req, res) => controller.one(req, res));
  router.post("/books", makeValidateBody(BookDto), (req, res) => controller.save(req, res));
  router.delete("/books/:id", (req, res) => controller.remove(req, res));

  return router;
};
