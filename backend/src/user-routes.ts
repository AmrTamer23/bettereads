import { Hono } from "hono";
import {
  // createBook,
  // deleteBook,
  getAllBooks,
  getBookByURL,
  // updateBook,
} from "../handlers/books";
import {
  createOrUpdateUserBook,
  deleteUserBook,
  getAllUserBooks,
  getUserBookById,
  updateUserBook,
} from "../handlers/user-book";

const routes = new Hono();

routes.post("/search-books", (c) => {
  return getAllBooks(c);
});
routes.get("/books/:url", (c) => {
  console.log("GET /books called");
  return getBookByURL(c);
});
// routes.post("/books", createBook);
// routes.put("/books/:id", updateBook);
// routes.delete("/books/:id", deleteBook);

routes.get("/user-books", getAllUserBooks);
routes.get("/user-books/:id", getUserBookById);
routes.post("/user-books", createOrUpdateUserBook);
routes.put("/user-books/:id", updateUserBook);
routes.delete("/user-books/:id", deleteUserBook);

export default routes;
