import { prisma } from "../database.js";
import {
  createDiaryEntryData,
  updateDiaryEntryData,
} from "../services/diaryService.js";

//C
export async function createDiaryEntry(data: createDiaryEntryData) {
  await prisma.diaryEntries.create({ data });
}

//R
export async function getUserDiary(userId: number) {
  return await prisma.diaryEntries.findMany({ where: { userId } });
}

//U
export async function editDiaryEntry(id: number, data: updateDiaryEntryData) {
  await prisma.diaryEntries.update({ where: { id }, data });
}

//D
export async function deleteTextOnly(id: number) {
  await prisma.diaryEntries.update({
    where: { id },
    data: {
      text: "entry deleted",
    },
  });
}

export async function deleteWholeEntry(id: number) {
  await prisma.diaryEntries.delete({ where: { id } });
}
