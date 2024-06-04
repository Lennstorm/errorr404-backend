import Joi from "joi";
import orderSchema from "./orderSchema.js"; // Adjust the path if necessary

const orderHistorySchema = Joi.object({
  userId: Joi.number().required(),
  orders: Joi.array().items(orderSchema).required(),
  totalPrice: Joi.number().precision(2).required(),
});

export default orderHistorySchema;
