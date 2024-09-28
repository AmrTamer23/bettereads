import { type Context } from "hono";
import { User } from "../../types";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import db from "../modules/db";

export const createNewUser = async (c: Context) => {
  const body = await c.req.json();
  const { userName, password, email, avatar } = body;
  try {
    const existingUser = await db.user.findUnique({
      where: { userName },
    });

    if (existingUser) {
      return c.json({ error: "Username already exists" }, 400);
    }

    const user = await db.user.create({
      data: {
        userName: userName,
        password: await hashPassword(password),
        email: email,
        avatar: avatar,
      },
    });

    const token = createJWT(user as User);

    return c.json({ token });
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong" }, 500);
  }
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
