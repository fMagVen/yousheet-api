import Joi from "joi";

export const diaryEntrySchema = Joi.object({
  text: Joi.string(),
});
