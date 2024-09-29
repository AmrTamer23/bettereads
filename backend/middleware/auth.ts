import { User } from "@prisma/client";
import { Context } from "hono";
import jwt from "jsonwebtoken";

export const protect = async (c: Context, next: Function) => {
  const bearer = c.req.header("authorization");

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return c.text("Unauthorized", 401);
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    return c.text("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    // Attach user information to context for access in routes
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.text("Unauthorized", 401);
  }
};
