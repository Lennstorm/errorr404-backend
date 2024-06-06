import customerSchema from "../models/customerSchema.js";

//Validation for creating a new costumer

export async function validatePutCustomer(req, res, next) {
  const updatedCustomer = req.body;

  // Validate the updatedCustomer data against the schema
  const { error } = customerSchema.validate(updatedCustomer);

  if (error) {
    // If validation fails, send a 400 Bad Request response with error details
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // If validation passes and no duplicates found, proceed to the next middleware or route handler
  next();
}
