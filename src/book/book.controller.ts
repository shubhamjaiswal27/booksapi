import { Request, Response } from "express";

import { BookService } from "./book.service";

import { BookDto } from "./book.dto";

export class BookController {
  private service: BookService;

  constructor() {
    this.service = new BookService();
  }

  async all(req: Request, res: Response) {
    let books = await this.service.all();

    res.json({ success: true, data: books });
  }

  async one(req: Request, res: Response) {
    let id: number = Number(req.params.id);

    let book = await this.service.one(id);

    if (book) res.json({ success: true, data: book });
    else res.status(404).json({ error: true, message: "Not Found" });
  }

  async save(req: Request, res: Response) {
    let bookDto: BookDto = req.body;

    try {
      let book = await this.service.save(bookDto);

      res.status(201).json({ success: true, data: book });
    } catch (error) {
      res.status(400).json({ error: true, message: error.detail || "Bad Request" });
    }
  }

  async remove(req: Request, res: Response) {
    let id: number = Number(req.params.id);

    let deletedBook = await this.service.remove(id);

    if (deletedBook) res.json({ success: true, data: deletedBook });
    else res.status(404).json({ error: true, message: "Not Found" });
  }
}
