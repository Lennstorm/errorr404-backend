import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.base": '"title" should be a type of text',
    "string.empty": '"title" cannot be an empty field',
    "string.min": '"title" should have a minimum length of 3 characters',
    "string.max": '"title" should have a maximum length of 50 characters',
    "any.required": '"title" is a required field',
  }),
  desc: Joi.string().min(10).max(200).required().messages({
    "string.base": '"desc" should be a type of text',
    "string.empty": '"desc" cannot be an empty field',
    "string.min": '"desc" should have a minimum length of 10 characters',
    "string.max": '"desc" should have a maximum length of 200 characters',
    "any.required": '"desc" is a required field',
  }),
  price: Joi.number().precision(2).positive().required().messages({
    "number.base": '"price" should be a type of number',
    "number.positive": '"price" should be a positive number',
    "any.required": '"price" is a required field',
  }),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default productSchema;
