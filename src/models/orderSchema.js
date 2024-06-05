import Joi from "joi";

const orderSchema = Joi.object({
  orderId: Joi.number().required(),
  product: Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().precision(2).required(),
  }).required(),
  orderTime: Joi.date().required(),
  deliveryTime: Joi.date().required(),
});

export default orderSchema;
