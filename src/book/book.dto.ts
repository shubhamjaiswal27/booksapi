import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class BookDto {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  isbn: string;

  @IsDate()
  @IsOptional()
  releaseDate?: Date;
}
