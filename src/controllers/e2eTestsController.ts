import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function testTruncateTableUsers(req: Request, res: Response) {
  await userService.testTruncateTableUsers();
  res.sendStatus(200);
}

export async function testSeedTableUsers(req: Request, res: Response) {
  await userService.testSeedTableUsers();
  res.sendStatus(200);
}
