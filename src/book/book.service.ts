import { getRepository } from "typeorm";

import { Book } from "./book.entity";

import { BookDto } from "./book.dto";

export class BookService {
  private repository = getRepository(Book);

  async all() {
    return this.repository.find();
  }

  async one(id: number) {
    return this.repository.findOne(id);
  }

  async save(data: BookDto) {
    let book: Book = await this.repository.save(data);

    return book;
  }

  async remove(id: number) {
    let bookToRemove = await this.repository.findOne(id);

    if (bookToRemove) await this.repository.remove(bookToRemove);

    return bookToRemove;
  }
}
