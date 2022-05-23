import Joi from "joi";
export var upsertTodoSchema = Joi.object({
    name: Joi.string(),
    priority: Joi.number(),
    dateDue: Joi.date()
});
