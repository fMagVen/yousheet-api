import Joi from "joi";

export const createDailySchema = Joi.object({
  name: Joi.string(),
  active: Joi.boolean().required(),
});

export const createChecklistSchema = Joi.object({
  dailyId: Joi.number().required(),
  name: Joi.string(),
});

export const updateDailySchema = Joi.object({
  name: Joi.string(),
  checked: Joi.boolean(),
  active: Joi.boolean(),
});

export const updateCheckSchema = Joi.object({
  name: Joi.string(),
  checked: Joi.boolean(),
});
