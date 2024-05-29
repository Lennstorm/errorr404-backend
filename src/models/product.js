import Joi from "joi";

const productSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.string().required(),
});

export default productSchema;
