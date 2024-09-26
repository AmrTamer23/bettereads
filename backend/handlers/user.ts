import { type Context } from "hono";
import { User } from "../../types";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import db from "../modules/db";

export const createNewUser = async (c: Context) => {
  const body = await c.req.json();
  const user = await db.user.create({
    data: {
      userName: body.userName,
      password: await hashPassword(body.password),
      email: body.email,
      avatar: body.avatar,
    },
  });

  const token = createJWT(user as User);

  return c.json({ token });
};

export const signIn = async (c: Context) => {
  const body = await c.req.json();
  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({ message: "Invalid email or password" }, 401);
  }

  const isValid = await comparePasswords(body.password, user.password);

  if (!isValid) {
    return c.json({ message: "Invalid email or password" }, 401);
  }

  const token = createJWT(user as User);

  return c.json({ token });
};
