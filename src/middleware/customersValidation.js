import customerSchema from "../models/customerSchema.js";
import {
  findCustomerByEmail,
  findCustomerByPhoneNumber,
} from "../services/customers.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

//Validation for creating a new costumer

export async function validateCustomer(req, res, next) {
  const updatedCustomer = req.body;

  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id; // Get the _id from the URL parameters

  // Validate the updatedCustomer data against the schema
  const { error } = customerSchema.validate(updatedCustomer);

  if (error) {
    // If validation fails, send a 400 Bad Request response with error details
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // Check if email is already in use
  const existingEmail = await findCustomerByEmail(updatedCustomer.email);
  if (existingEmail && existingEmail._id.toString() !== customerId) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Check if phone number is already in use
  const existingPhoneNumber = await findCustomerByPhoneNumber(
    updatedCustomer.phoneNumber
  );
  if (
    existingPhoneNumber &&
    existingPhoneNumber._id.toString() !== customerId
  ) {
    return res.status(400).json({ message: "Phone number already in use" });
  }

  // If validation passes and no duplicates found, proceed to the next middleware or route handler
  next();
}
