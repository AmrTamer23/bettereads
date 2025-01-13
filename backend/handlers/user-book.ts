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
  });

  if (!data) {
    return c.json({ message: "User book not found" }, 404);
  }

  return c.json({ data });
};

export const createOrUpdateUserBook = async (c: Context) => {
  const body = await c.req.json();
  if (!body.bookId || !body.status) {
    return c.json({ message: "Missing required fields" }, 400);
  }

  const isBookAlreadyAdded = await db.userBook.findFirst({
    where: {
      userId: c.get("user")?.id,
      bookId: body.bookId,
    },
  });

  if (isBookAlreadyAdded) {
    const data = await db.userBook.update({
      where: {
        id: isBookAlreadyAdded.id,
      },
      data: {
        status: body.status,
        finishDate: body.finishDate ?? null,
        startDate: body.startDate ?? null,
        progress: body.progress,
      },
    });
    return c.json({ message: "Book Updated" }, 200);
  }

  const data = await db.userBook.create({
    data: {
      userId: c.get("user")?.id,
      bookId: body.bookId,
      status: body.status,
      finishDate: body.finishDate ?? null,
      startDate: body.startDate ?? null,
      progress: body.progress,
      numberOfPages: body.numberOfPages,
    },
  });
  //TODO: Handle adding review if status is Read
  //TODO: Handle adding finish date only if the first status of the book is not Read

  return c.json({ data }, 201);
};

export const updateUserBook = async (c: Context) => {
  // const body = await c.req.json();
  // const data = await db.userBook.update({
  //   where: {
  //     id: body.id,
  //   },
  //   data: {
  //     status: body.status,
  //     finishDate: body.finishDate ?? null,
  //     rating: body.rating ?? null,
  //     review: body.review ?? null,
  //     startDate: body.startDate ?? null,
  //     progress: body.progress,
  //   },
  // });
  // return c.json({ data });
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
