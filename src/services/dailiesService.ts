import * as dailiesRepository from "../repositories/dailiesRepository.js";
import * as usersRepository from "../repositories/userRepository.js";

export interface createDailyData {
  userId: number;
  name?: string;
  active: boolean;
}

export interface createChecklistData {
  dailyId: number;
  name?: string;
}

export interface updateDailyData {
  name?: string;
  checked?: boolean;
  active?: boolean;
}

export interface updateChecklistData {
  name?: string;
  checked?: boolean;
}

export async function createDaily(data: createDailyData) {
  await dailiesRepository.createDaily(data);
}

export async function createChecklist(data: createChecklistData) {
  await dailiesRepository.createChecklist(data);
}

export async function getDailies(user, active: boolean) {
  const userData = await usersRepository.readUserByEmail(user.email);
  return await dailiesRepository.getDailies(userData.id, active);
}

export async function editDaily(dailyId: number, data: updateDailyData) {
  await dailiesRepository.editDaily(dailyId, data);
}

export async function editChecklist(
  checklistId: number,
  data: updateChecklistData
) {
  await dailiesRepository.editChecklist(checklistId, data);
}

export async function deleteDaily(id: number) {
  await dailiesRepository.deleteDaily(id);
}

export async function deleteChecklist(id: number) {
  await dailiesRepository.deleteChecklist(id);
}
