import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default loginSchema;
