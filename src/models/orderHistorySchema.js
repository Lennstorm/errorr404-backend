import Joi from "joi";

const orderHistorySchema = Joi.object({
  orderId: Joi.string().required(),
  totalPrice: Joi.number().required(),
});

export default orderHistorySchema;
