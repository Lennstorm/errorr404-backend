// Placeholder validation middleware functions

import productSchema from "../models/productSchema.js";

//Validate product data
export function validateProduct(req, res, next) {
  const product = req.body;
  const { error } = productSchema.validate(product);

  if (!error) {
    next();
  } else {
    res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }
}
