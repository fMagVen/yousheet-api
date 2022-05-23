import Joi from "joi";
export var logUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});
export var upsertUserSchema = Joi.object({
    email: Joi.string().required(),
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    newEmail: Joi.string(),
    newNickname: Joi.string(),
    newPassword: Joi.string()
});
