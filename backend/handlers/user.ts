import { type Context } from "hono";
import { User } from "../../types";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import db from "../modules/db";

export const createNewUser = async (c: Context) => {
  const body = await c.req.json();
  const { username, password, email } = body;
  try {
    const existingUser = await db.user.findUnique({
      where: { username, email },
    });

    if (existingUser) {
      return c.json({ error: "Username already exists" }, 400);
    }

    const user = await db.user.create({
      data: {
        username,
        password: await hashPassword(password),
        email: email,
        avatar:
          username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase(),
      },
    });

    const token = createJWT(user as User);

    c.header(
      "Set-Cookie",
      `auth-token=${token}; ` +
        "HttpOnly; " +
        "Path=/; " +
        "SameSite=Strict; " +
        // TODO:In production, add: Secure;
        "Max-Age=86400"
    );

    return c.json({
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.admin,
      },
    });
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

  c.header(
    "Set-Cookie",
    `auth-token=${token}; ` +
      "HttpOnly; " +
      "Path=/; " +
      "SameSite=Strict; " +
      // In production, add: Secure;
      "Max-Age=86400"
  );

  return c.json({
    user: {
      id: user.id,
      username: user.username,
      isAdmin: user.admin,
    },
  });
};

export const signOut = async (c: Context) => {
  c.header("Set-Cookie", "Path=/; Max-Age=0; HttpOnly; SameSite=Strict");

  return c.json({ success: true });
};
