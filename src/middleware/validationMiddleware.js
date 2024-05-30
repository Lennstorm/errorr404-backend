// Placeholder validation middleware functions

import customerSchema from "../models/customerSchema.js"; 
import productSchema from "../models/productSchema.js"; 

// Validate customer data
export function validateCustomer(req, res, next) {
  const customer = req.body;
  const { error } = customerSchema.validate(customer);

  if (!error) {
    next();
  } else {
    res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }
}

export const validateOrderData = (req, res, next) => {
  // Placeholder logic for validating order data
  next();
};

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