import { Hono } from "hono";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../handlers/books";
import {
  createUserBook,
  deleteUserBook,
  getAllUserBooks,
  getUserBookById,
  updateUserBook,
} from "../handlers/user-book";

const routes = new Hono();

routes.get("/books", (c) => {
  console.log("GET /books called");
  return getAllBooks(c);
});
routes.get("/books/:id", getBookById);
routes.post("/books", createBook);
routes.put("/books/:id", updateBook);
routes.delete("/books/:id", deleteBook);

routes.get("/user-books", getAllUserBooks);
routes.get("/user-books/:id", getUserBookById);
routes.post("/user-books", createUserBook);
routes.put("/user-books/:id", updateUserBook);
routes.delete("/user-books/:id", deleteUserBook);

export default routes;
