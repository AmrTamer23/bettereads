import { Router } from "express";
import { body, validationResult } from "express-validator";
import db from "./modules/db";
import { atLeastOneProp, interceptErroredRequest } from "./modules/middleware";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./handlers/books";

const router = Router();

// Books

router.get("/books", getAllBooks);

router.get("/books/:id", getBookById);

router.post(
  "/books",
  body(["title", "author", "numOfPages", "bookCover"]).isString(),
  interceptErroredRequest,
  createBook
);

router.put("/books/:id", atLeastOneProp, updateBook);

router.delete("/books/:id", deleteBook);

// User Book

router.get("/userbooks", () => {});

router.get("/userbooks/:id", () => {});

router.post(
  "/userbooks",
  body(["bookId", "userId", "status"]).isString(),
  interceptErroredRequest,
  (req, res) => {
    //TODO: Create user book
    return res.json({ message: "User book created" });
  }
);

router.put("/userbooks/:id", atLeastOneProp, () => {});

router.delete("/userbooks/:id", () => {});

export default router;
