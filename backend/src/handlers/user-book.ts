import db from "../modules/db";
import { type Request, type Response } from "express";

export const getAllUserBooks = async (req: Request, res: Response) => {
  const data = await db.userBook.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      book: true,
    },
  });

  res.json({ data });
};

export const getUserBookById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await db.userBook.findUnique({
    where: {
      id,
    },
    include: {
      book: true,
    },
  });

  if (!data) {
    return res.status(404).json({ message: "User book not found" });
  }

  res.json({ data });
};

export const createUserBook = async (req: Request, res: Response) => {
  const body = req.body as UserBook;
  if (!body.bookId || !body.status) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const data = await db.userBook.create({
    data: {
      bookId: body.bookId,
      userId: req.user?.id!,
      status: body.status,
    },
  });

  res.status(201);
  res.json({ data });
};

export const updateUserBook = async (req: Request, res: Response) => {
  const body = req.body as UserBook;

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

  res.json({ data });
};

export const deleteUserBook = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await db.userBook.delete({
    where: {
      id,
    },
  });

  res.json({ data });
};
