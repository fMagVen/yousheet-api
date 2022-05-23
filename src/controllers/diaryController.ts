import { Request, Response } from "express";
import * as diaryService from "../services/diaryService.js";

export async function createDiaryEntry(req: Request, res: Response) {
  const data: diaryService.createDiaryEntryData = {
    userId: res.locals.user.id,
  };
  if (req.body.text) data.text = req.body.text;
  await diaryService.createDiaryEntry(data);
  res.sendStatus(201);
}

export async function getUserDiary(_: Request, res: Response) {
  const user = res.locals.user;
  const diary = await diaryService.getUserDiary(user);
  res.status(200).send(diary);
}

export async function editDiaryEntry(req: Request, res: Response) {
  const user = res.locals.user;
  const data: diaryService.updateDiaryEntryData = {
    text: req.body.text,
  };
  await diaryService.editDiaryEntry(user.id, data);
}

export async function deleteTextOnly(req: Request, res: Response) {
  const entryId = parseInt(req.params.id);
  await diaryService.deleteTextOnly(entryId);
  res.sendStatus(200);
}

export async function deleteWholeEntry(req: Request, res: Response) {
  const textId = parseInt(req.params.id);
  await diaryService.deleteWholeEntry(textId);
  res.sendStatus(200);
}
