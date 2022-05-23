import Joi from "joi";

export const skillSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
});
