import * as skillsRepository from "../repositories/skillsRepository.js";

export interface createSkillData extends editSkillData {
  userId: number;
}

export interface editSkillData {
  title?: string;
  text?: string;
}

export async function createSkill(data: createSkillData) {
  await skillsRepository.createSkill(data);
}

export async function getSkills(userId: number) {
  return await skillsRepository.getSkills(userId);
}

export async function editSkill(id: number, data: editSkillData) {
  await skillsRepository.editSkill(id, data);
}

export async function deleteSkill(id: number) {
  await skillsRepository.deleteSkill(id);
}
