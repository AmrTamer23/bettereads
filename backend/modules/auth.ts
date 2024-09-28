import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type Context } from "hono";
import { User } from "../../types";
import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in the environment variables");
  process.exit(1);
}

// Comparing passwords using bcrypt
export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

// Hashing password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5);
};

// Creating JWT
export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.userName },
    process.env.JWT_SECRET!
  );
  return token;
};

// Protect middleware for Hono
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
