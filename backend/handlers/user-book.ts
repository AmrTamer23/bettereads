import db from "../modules/db";
import { type Context } from "hono";

export const getAllUserBooks = async (c: Context) => {
  const data = await db.userBook.findMany({
    where: {
      userId: c.get("user")?.id,
    },
  });

  return c.json({ data });
};

export const getUserBookById = async (c: Context) => {
  const id = c.req.param("id");

  const data = await db.userBook.findUnique({
    where: {
      id,
    },
    include: {
      book: true,
    },
  });

  if (!data) {
    return c.json({ message: "User book not found" }, 404);
  }

  return c.json({ data });
};

export const createUserBook = async (c: Context) => {
  const body = await c.req.json();
  if (!body.bookId || !body.status) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  const data = await db.userBook.create({
    data: {
      bookId: body.bookId,
      userId: c.get("user")?.id!,
      status: body.status,
    },
  });

  return c.json({ data }, 201);
};

export const updateUserBook = async (c: Context) => {
  const body = await c.req.json();

  const data = await db.userBook.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
      finishDate: body.finishDate ?? null,
      rating: body.rating ?? null,
      review: body.review ?? null,
      startDate: body.startDate ?? null,
      progress: body.progress,
    },
  });

  return c.json({ data });
};

export const deleteUserBook = async (c: Context) => {
  const id = c.req.param("id");

  const data = await db.userBook.delete({
    where: {
      id,
    },
  });

  return c.json({ data });
};
