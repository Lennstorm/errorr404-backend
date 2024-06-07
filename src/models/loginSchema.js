import Joi from "joi";

// Email regex allowing only a-z, A-Z before the @ symbol
const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

// Password regex allowing only a-z, A-Z, and numbers 1-9
const passwordRegex = /^[a-zA-Z1-9]+$/;

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).email().required().messages({
    "string.pattern.base":
      '"email" can only contain letters (a-z, A-Z) before the @ symbol',
  }),
  password: Joi.string().min(6).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      '"password" can only contain letters (a-z, A-Z) and numbers (1-9)',
    "string.min": '"password" should have a minimum length of 6 characters',
  }),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default loginSchema;
