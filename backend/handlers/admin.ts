import { type Context } from "hono";
import db from "../modules/db";

export const approveBook = async (c: Context) => {
  try {
    const id = c.req.query("id");

    await db.book.update({
      where: { id: id },
      data: {
        approved: true,
      },
    });
  } catch (error) {
    console.error("Error approving book:", error);
    return c.json({ message: "Error approving book" }, 500);
  }

  return c.json({ message: "Book approved successfully" });
};

export const rejectBook = async (c: Context) => {
  try {
    const { id } = c.req.param();

    await db.book.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("Error rejecting book:", error);
    return c.json({ message: "Error rejecting book" }, 500);
  }
  return c.json({ message: "Book rejected successfully" });
};
