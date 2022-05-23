import * as userRepository from "../repositories/userRepository.js";
import * as errorUtils from "../utils/errorUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface userData {
  nickname: string;
  email: string;
  password: string;
}

export type logData = Omit<userData, "nickname">;

export interface updateData extends userData {
  newNickname?: string;
  newEmail?: string;
  newPassword?: string;
}

export async function createUser(data: userData) {
  const takenmail = await userRepository.readUserByEmail(data.email);
  if (takenmail) throw errorUtils.conflictError("email already registered");
  const takenick = await userRepository.readUserByNickname(data.nickname);
  if (takenick)
    throw errorUtils.conflictError(
      "nickname already taken, choose another one"
    );

  await userRepository.createUser(data);
}

export async function logUser(data: logData) {
  const user = await userRepository.readUserByEmail(data.email);
  if (!user) throw errorUtils.notFoundError("user not found");
  const token = jwt.sign(
    { nickname: user?.nickname, email: user?.email },
    process.env.JWT_SECRET as string
  );
  return token;
}

export async function updateUser(data: updateData) {
  await validateUser(data);
  if (data.newEmail) {
    const usermail = await userRepository.readUserByEmail(data.newEmail);
    if (usermail)
      throw errorUtils.conflictError("this email is already in use");
  }
  if (data.newNickname) {
    const usernick = await userRepository.readUserByNickname(data.newNickname);
    if (usernick)
      throw errorUtils.conflictError(
        "this nickname is already taken, choose another one"
      );
  }
  if (data.newPassword) {
    const hashedPassword = bcrypt.hashSync(
      data.newPassword,
      process.env.SALT as string
    );
    data.newPassword = hashedPassword;
  }
  await userRepository.updateUser(data);
}

export async function deleteUser(data: userData) {
  await validateUser(data);
  await userRepository.deleteUser(data.email);
}

async function validateUser(data: userData) {
  const user = await userRepository.readUserByEmail(data.email);
  if (!user) throw errorUtils.notFoundError("user not found");
  if (user.nickname != data.nickname)
    throw errorUtils.unauthorizedError("wrong nickname");
  if (user.password != data.password)
    throw errorUtils.unauthorizedError("wrong password");
}

export async function testTruncateTableUsers() {
  await userRepository.testTruncateTableUsers();
}

export async function testSeedTableUsers() {
  await userRepository.testSeedTableUsers();
}
