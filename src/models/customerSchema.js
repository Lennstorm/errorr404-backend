import Joi from "joi";

const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string(),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default customerSchema;
