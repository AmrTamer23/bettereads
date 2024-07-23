import { Router } from "express";
import { body, validationResult } from "express-validator";
import db from "./modules/db";

const router = Router();

// Books

router.get("/books", () => {});

router.get("/books/:id", () => {});

router.post(
  "/books",
  body(["title", "author", "numOfPages", "bookCover"]).isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // TODO:Create book
    return res.json({ message: "Book created" });
  }
);
router.put(
  "/books/:id",
  (req, res, next) => {
    const numOfProps = Object.keys(req.body).length;
    if (numOfProps === 0) {
      return res.status(400).json({ message: "No data provided" });
    }
    next();
  },
  (req, res) => {
    // TODO:Update book
    return res.json({ message: "Book updated" });
  }
);
router.delete("/books/:id", () => {});

// User Book

router.get("/userbooks", () => {});

router.get("/userbooks/:id", () => {});

router.post(
  "/userbooks",
  body(["bookId", "userId", "status"]).isString(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //TODO: Create user book
    return res.json({ message: "User book created" });
  }
);

router.put(
  "/userbooks/:id",
  (req, res, next) => {
    const numOfProps = Object.keys(req.body).length;
    if (numOfProps === 0) {
      return res.status(400).json({ message: "No data provided" });
    }
    next();
  },
  () => {}
);

router.delete("/userbooks/:id", () => {});

export default router;
