import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.userName },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protect = (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const bearer = req?.headers?.["authorization"] || "";
  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
    return;
  }
};
