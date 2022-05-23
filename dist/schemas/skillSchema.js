import Joi from "joi";
export var skillSchema = Joi.object({
    title: Joi.string(),
    text: Joi.string()
});
