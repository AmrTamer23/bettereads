import { Router } from "express";

const router = Router();

// Books

router.get("/books", () => {});
router.get("/books/:id", () => {});
router.post("/books", () => {});
router.put("/books/:id", () => {});
router.delete("/books/:id", () => {});

// User Book

router.get("/userbooks", () => {});
router.get("/userbooks/:id", () => {});
router.post("/userbooks", () => {});
router.put("/userbooks/:id", () => {});
router.delete("/userbooks/:id", () => {});

export default router;
