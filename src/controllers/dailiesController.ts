import { Request, Response } from "express";
import * as dailiesService from "../services/dailiesService.js";

export async function createDaily(req: Request, res: Response) {
  const data: dailiesService.createDailyData = {
    userId: res.locals.user.id,
    active: req.body.active,
  };
  if (req.body.name) data.name = req.body.name;
  await dailiesService.createDaily(data);
  res.sendStatus(201);
}

export async function createChecklist(req: Request, res: Response) {
  const data: dailiesService.createChecklistData = {
    dailyId: req.body.id,
  };
  if (req.body.name) data.name = req.body.name;
  await dailiesService.createChecklist(data);
  res.sendStatus(201);
}

export async function getDailies(req: Request, res: Response) {
  const user = res.locals.user;
  const active = req.query.active === "true";
  const dailies = await dailiesService.getDailies(user, active);
  res.status(200).send(dailies);
}

export async function editDaily(req: Request, res: Response) {
  const dailyId = parseInt(req.params.id);
  const data: dailiesService.updateDailyData = {};
  fillEditDataForm(data, req.body.name, req.body.checked);
  if (req.body.active) data.active = req.body.active;
  await dailiesService.editDaily(dailyId, data);
  res.sendStatus(200);
}

export async function editChecklist(req: Request, res: Response) {
  const checklistId = parseInt(req.params.id);
  const data: dailiesService.updateChecklistData = {};
  fillEditDataForm(data, req.body.name, req.body.checked);
  await dailiesService.editChecklist(checklistId, data);
  res.sendStatus(200);
}

function fillEditDataForm(
  data: any,
  name: string | undefined,
  checked: boolean | undefined
) {
  if (name) data.name = name;
  if (checked) data.checked = checked;
}

export async function deleteDaily(req: Request, res: Response) {
  const dailyId = parseInt(req.params.id);
  await dailiesService.deleteDaily(dailyId);
  res.sendStatus(200);
}

export async function deleteChecklist(req: Request, res: Response) {
  const checklistId = parseInt(req.params.id);
  await dailiesService.deleteChecklist(checklistId);
  res.sendStatus(200);
}
