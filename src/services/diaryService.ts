import * as diaryRepository from "../repositories/diaryRepository.js";
import * as usersRepository from "../repositories/userRepository.js";

export interface createDiaryEntryData {
  userId: number;
  text?: string;
}

export interface updateDiaryEntryData {
  text: string;
}

export async function createDiaryEntry(data: createDiaryEntryData) {
  await diaryRepository.createDiaryEntry(data);
}

export async function getUserDiary(user) {
  const userData = await usersRepository.readUserByEmail(user.email);
  return await diaryRepository.getUserDiary(userData.id);
}

export async function editDiaryEntry(id: number, data: updateDiaryEntryData) {
  await diaryRepository.editDiaryEntry(id, data);
}

export async function deleteTextOnly(id: number) {
  await diaryRepository.deleteTextOnly(id);
}

export async function deleteWholeEntry(id: number) {
  await diaryRepository.deleteWholeEntry(id);
}
