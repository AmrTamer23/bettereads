import { Router } from "express";
import { body } from "express-validator";
import { atLeastOneProp, interceptErroredRequest } from "./modules/middleware";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./handlers/book";
import {
  createUserBook,
  deleteUserBook,
  getAllUserBooks,
  getUserBookById,
  updateUserBook,
} from "./handlers/user-book";

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

router.get("/userbooks", getAllUserBooks);

router.get("/userbooks/:id", getUserBookById);

router.post(
  "/userbooks",
  body(["bookId", "userId", "status"]).isString(),
  interceptErroredRequest,
  createUserBook
);

router.put("/userbooks/:id", atLeastOneProp, updateUserBook);

router.delete("/userbooks/:id", deleteUserBook);

export default router;
