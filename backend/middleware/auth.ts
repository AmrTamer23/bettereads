import { User } from "@prisma/client";
import { Context } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

export const protect = async (c: Context, next: Function) => {
  console.log("Cookies:", getCookie(c));
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return c.json({ message: "Unauthorized - No token provided" }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json({ message: "Unauthorized - Invalid token" }, 401);
  }
};
