import Joi from "joi";
import orderHistorySchema from "./orderHistorySchema.js";

const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string(),
  orderHistory: Joi.array().items(orderHistorySchema).optional(),
});

export default customerSchema;
