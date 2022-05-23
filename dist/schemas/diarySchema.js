import Joi from "joi";
export var diaryEntrySchema = Joi.object({
    text: Joi.string()
});
