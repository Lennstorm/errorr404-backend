import Joi from "joi";

const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    postalCode: Joi.string(),
    country: Joi.string(),
  }),
});

export default customerSchema;
