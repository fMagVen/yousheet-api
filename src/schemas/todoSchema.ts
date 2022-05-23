import Joi from "joi";

export const upsertTodoSchema = Joi.object({
  name: Joi.string(),
  priority: Joi.number(),
  dateDue: Joi.date(),
});
