import Joi from "joi";
export var createDailySchema = Joi.object({
    name: Joi.string(),
    active: Joi.boolean().required()
});
export var createChecklistSchema = Joi.object({
    dailyId: Joi.number().required(),
    name: Joi.string()
});
export var updateDailySchema = Joi.object({
    name: Joi.string(),
    checked: Joi.boolean(),
    active: Joi.boolean()
});
export var updateCheckSchema = Joi.object({
    name: Joi.string(),
    checked: Joi.boolean()
});
