import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import db from "../modules/db";
import { type Request, type Response } from "express";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await db.user.create({
    data: {
      userName: req.body.userName,
      password: await hashPassword(req.body.password),
      email: req.body.email,
      avatar: req.body.avatar,
    },
  });

  const token = createJWT(user as User);

  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createJWT(user as User);

  res.json({ token });
};
