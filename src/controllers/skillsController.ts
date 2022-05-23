import { Request, Response } from "express";
import * as skillsService from "../services/skillsService.js";
import { createSkillData, editSkillData } from "../services/skillsService";

export async function createSkill(req: Request, res: Response) {
  const user = res.locals.user;
  const data: createSkillData = {
    userId: user.id,
  };
  fillDataForm(data, req.body.title, req.body.text);
  await skillsService.createSkill(data);
  res.sendStatus(201);
}

export async function getSkills(_: Request, res: Response) {
  const user = res.locals.user;
  const skills = await skillsService.getSkills(user.id);
  res.sendStatus(200);
}

export async function editSkill(req: Request, res: Response) {
  const skillId = parseInt(req.params.id);
  const data: editSkillData = {};
  fillDataForm(data, req.body.title, req.body.text);
  await skillsService.editSkill(skillId, data);
  res.sendStatus(200);
}

export async function deleteSkill(req: Request, res: Response) {
  const skillId = parseInt(req.params.id);
  await skillsService.deleteSkill(skillId);
  res.sendStatus(200);
}

function fillDataForm(
  data: editSkillData,
  title: string | undefined,
  text: string | undefined
) {
  if (title) data.title = title;
  if (text) data.text = text;
}
