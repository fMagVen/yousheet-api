import { prisma } from "../database.js";
import { userData, updateData } from "../services/userService.js";

export async function createUser(data: userData) {
  await prisma.users.create({ data });
}

export async function readUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: { email },
  });
}

export async function readUserByNickname(nickname: string) {
  return await prisma.users.findUnique({
    where: { nickname },
  });
}

export async function updateUser(data: updateData) {
  await prisma.users.update({
    where: { email: data.email },
    data: {
      email: data.newEmail,
      nickname: data.newNickname,
      password: data.newPassword,
    },
  });
}

export async function deleteUser(email: string) {
  await prisma.users.delete({
    where: { email },
  });
}

export async function testTruncateTableUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
}

export async function testSeedTableUsers() {
  await prisma.$executeRaw`
  INSERT INTO users
  ("nickname", "email", "password")
  VALUES
  ('fulano', 'fulano@email.com', 'senha'),
  ('ciclano', 'ciclano@email.com', 'senha'),
  ('beltrano', beltrano@email.com, 'senha'),
  `;
}
