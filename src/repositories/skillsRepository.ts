import { prisma } from "../database.js";
import { createSkillData, editSkillData } from "../services/skillsService.js";

//C
export async function createSkill(data: createSkillData) {
  await prisma.skills.create({ data });
}

//R
export async function getSkills(userId: number) {
  await prisma.skills.findMany({ where: { userId } });
}

//U
export async function editSkill(id: number, { title, text }: editSkillData) {
  await prisma.skills.update({
    where: { id },
    data: {
      title,
      text,
      lastModified: new Date(),
    },
  });
}

//D
export async function deleteSkill(id: number) {
  await prisma.skills.delete({ where: { id } });
}
