import db from "../modules/db";
import { type Request, type Response } from "express";

export const getAllBooks = async (req: Request, res: Response) => {
  const data = await db.book.findMany();

  res.json({ data });
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await db.book.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ data });
};

export const createBook = async (req: Request, res: Response) => {
  const body = req.body as Book;
  if (
    !body.title ||
    !body.author ||
    !body.numOfPages ||
    !body.bookCover ||
    !body.isbn ||
    !body.genre ||
    !body.description ||
    !body.publishedDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const data = await db.book.create({
    data: {
      title: body.title,
      author: body.author,
      numOfPages: body.numOfPages,
      bookCover: body.bookCover,
      isbn: body.isbn,
      genre: body.genre,
      description: body.description,
      publishedDate: body.publishedDate,
    },
  });

  res.status(201);
  res.json({ data });
};

export const updateBook = async (req: Request, res: Response) => {
  const body = req.body as Book;

  const data = await db.book.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      author: body.author,
      numOfPages: body.numOfPages,
      bookCover: body.bookCover,
      isbn: body.isbn,
      genre: body.genre,
      description: body.description,
      publishedDate: body.publishedDate,
    },
  });

  res.json({ data });
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id;

  await db.book.delete({
    where: {
      id,
    },
  });

  res.json({ message: "Book deleted" });
};
