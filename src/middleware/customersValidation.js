import customerSchema from "../models/customerSchema.js";
import {
  findCustomerByEmail,
  findCustomerByPhoneNumber,
} from "../services/customers.js";

export async function validateCustomer(req, res, next) {
  const customer = req.body;

  // Validate the customer data against the schema
  const { error } = customerSchema.validate(customer);

  if (error) {
    // If validation fails, send a 400 Bad Request response with error details
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // Check if email is already in use
  const existingEmail = await findCustomerByEmail(customer.email);
  if (existingEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Check if phone number is already in use
  const existingPhoneNumber = await findCustomerByPhoneNumber(
    customer.phoneNumber
  );
  if (existingPhoneNumber) {
    return res.status(400).json({ message: "Phone number already in use" });
  }

  // If validation passes and no duplicates found, proceed to the next middleware or route handler
  next();
}
