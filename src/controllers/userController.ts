import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  await userService.createUser(user);
  res.sendStatus(201);
}

export async function logUser(req: Request, res: Response) {
  const user = req.body;
  const token = await userService.logUser(user);
  res.status(200).send(token);
}

export async function updateUser(req: Request, res: Response) {
  const user = req.body;
  await userService.updateUser(user);
  res.sendStatus(200);
}

export async function deleteUser(req: Request, res: Response) {
  const user = req.body;
  await userService.deleteUser(user);
  res.sendStatus(200);
}
