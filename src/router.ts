import { Router } from "express";
import { body, validationResult } from "express-validator";
import db from "./modules/db";
import { atLeastOneProp, interceptErroredRequest } from "./modules/middleware";

const router = Router();

// Books

router.get("/books", () => {});

router.get("/books/:id", () => {});

router.post(
  "/books",
  body(["title", "author", "numOfPages", "bookCover"]).isString(),
  interceptErroredRequest,
  (req, res) => {
    // TODO:Create book
    return res.json({ message: "Book created" });
  }
);

router.put("/books/:id", atLeastOneProp, (req, res) => {
  // TODO:Update book
  return res.json({ message: "Book updated" });
});

router.delete("/books/:id", () => {});

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
