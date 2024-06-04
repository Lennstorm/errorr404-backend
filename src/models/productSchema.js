import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().precision(2).required(), // nummer med två decimaler
});

export default productSchema;
