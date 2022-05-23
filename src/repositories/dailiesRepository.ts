import { prisma } from "../database.js";
import {
  createDailyData,
  createChecklistData,
  updateDailyData,
  updateChecklistData,
} from "../services/dailiesService.js";

//C
export async function createDaily(data: createDailyData) {
  await prisma.dailies.create({ data });
}

export async function createChecklist(data: createChecklistData) {
  await prisma.checklists.create({ data });
}

//R
export async function getDailies(id: number, active: boolean) {
  return await prisma.dailies.findMany({
    where: {
      userId: id,
      active,
    },
    include: {
      checklists: true,
    },
  });
}

//U
export async function editDaily(dailyId: number, data: updateDailyData) {
  return await prisma.dailies.update({
    where: {
      id: dailyId,
    },
    data,
  });
}

export async function editChecklist(
  checklistId: number,
  data: updateChecklistData
) {
  return await prisma.checklists.update({
    where: {
      id: checklistId,
    },
    data,
  });
}

//D
export async function deleteDaily(id: number) {
  await prisma.checklists.deleteMany({ where: { dailyId: id } });
  await prisma.dailies.delete({ where: { id } });
}

export async function deleteChecklist(id: number) {
  await prisma.checklists.delete({ where: { id } });
}
