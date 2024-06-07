import Joi from "joi";

// Swedish alphabet regex (a-ö, A-Ö without spaces or other characters)
const swedishAlphabetRegex = /^[a-öA-Ö]+$/i;

// Email regex allowing only a-z, A-Z before the @ symbol
const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

// Password regex allowing only a-z, A-Z, and numbers 1-9
const passwordRegex = /^[a-zA-Z1-9]+$/;

const customerSchema = Joi.object({
  firstName: Joi.string().pattern(swedishAlphabetRegex).required().messages({
    "string.pattern.base":
      '"firstName" can only contain letters from the Swedish alphabet (a-ö, A-Ö)',
  }),
  lastName: Joi.string().pattern(swedishAlphabetRegex).required().messages({
    "string.pattern.base":
      '"lastName" can only contain letters from the Swedish alphabet (a-ö, A-Ö)',
  }),
  email: Joi.string().pattern(emailRegex).email().required().messages({
    "string.pattern.base":
      '"email" can only contain letters (a-z, A-Z) before the @ symbol',
  }),
  password: Joi.string().min(6).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      '"password" can only contain letters (a-z, A-Z) and numbers (1-9)',
    "string.min": '"password" should have a minimum length of 6 characters',
  }),
  phoneNumber: Joi.number().messages({
    "number.base": '"phoneNumber" must be a number',
  }),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default customerSchema;
