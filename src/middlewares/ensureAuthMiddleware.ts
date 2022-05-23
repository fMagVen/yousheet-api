import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "../utils/errorUtils.js";
import * as userRepository from "../repositories/userRepository.js";

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  if (!authorization) throw unauthorizedError("Missing authorization header");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw unauthorizedError("Missing token");

  try {
    const { email, nickname } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as {
      email: string;
      nickname: string;
    };
    const user = await userRepository.readUserByEmail(email);
    if (!user) throw unauthorizedError("Invalid token");
    if (user.nickname != nickname) throw unauthorizedError("Invalid token");
    res.locals.user = user;

    next();
  } catch {
    throw unauthorizedError("Invalid token");
  }
}
