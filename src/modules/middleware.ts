import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const atLeastOneProp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const numOfProps = Object.keys(req.body).length;
  if (numOfProps === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  next();
};

export const interceptErroredRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
