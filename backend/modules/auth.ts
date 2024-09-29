import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../types";
import { config } from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in the environment variables");
  process.exit(1);
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.userName, admin: user.admin },
    process.env.JWT_SECRET!,
    { expiresIn: "4h" }
  );
  return token;
};
