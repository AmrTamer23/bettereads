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
import { createNewUser, signIn } from "../handlers/user";

const app = new Hono();

app.get("/books", (c) => {
  console.log("GET /books called");
  return getAllBooks(c);
});
app.get("/books/:id", getBookById);
app.post("/books", createBook);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

app.get("/user-books", getAllUserBooks);
app.get("/user-books/:id", getUserBookById);
app.post("/user-books", createUserBook);
app.put("/user-books/:id", updateUserBook);
app.delete("/user-books/:id", deleteUserBook);

app.post("/users", createNewUser);
app.post("/signin", signIn);

export default app;
