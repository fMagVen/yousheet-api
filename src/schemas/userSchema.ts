import Joi from "joi";
import { logData, updateData } from "../services/userService";

export const logUserSchema = Joi.object<logData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const upsertUserSchema = Joi.object<updateData>({
  email: Joi.string().required(),
  nickname: Joi.string().required(),
  password: Joi.string().required(),
  newEmail: Joi.string(),
  newNickname: Joi.string(),
  newPassword: Joi.string(),
});
