import { type Context } from "hono";
import db from "../modules/db";

export const getAllBooks = async (c: Context) => {
  const data = await db.book.findMany();
  return c.json({ data });
};

export const getBookById = async (c: Context) => {
  const id = c.req.param("id");

  const data = await db.book.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    return c.json({ message: "Book not found" }, 404);
  }

  return c.json({ data });
};

export const createBook = async (c: Context) => {
  const body = await c.req.json();
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
    return c.json({ message: "Missing required fields" }, 400);
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

  return c.json({ data }, 201);
};

export const updateBook = async (c: Context) => {
  const body = await c.req.json();

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

  return c.json({ data });
};

export const deleteBook = async (c: Context) => {
  const id = c.req.param("id");

  await db.book.delete({
    where: {
      id,
    },
  });

  return c.json({ message: "Book deleted" });
};
