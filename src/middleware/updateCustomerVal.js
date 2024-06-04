import customerSchema from "../models/customerSchema.js";
import {
  findCustomerByEmail,
  findCustomerByPhoneNumber,
} from "../services/customers.js";

export async function validateUpdateCustomer(req, res, next) {
  const customer = req.body;
  const customerIdFromUrl = req.params.id; // Get the _id from the URL parameters

  // Validate the customer data against the schema
  const { error } = customerSchema.validate(customer);

  if (error) {
    // If validation fails, send a 400 Bad Request response with error details
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // Check if email is already in use (excluding the current user)
  const existingEmail = await findCustomerByEmail(customer.email);
  if (existingEmail && existingEmail._id.toString() !== customerIdFromUrl) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Check if phone number is already in use (excluding the current user)
  const existingPhoneNumber = await findCustomerByPhoneNumber(
    customer.phoneNumber
  );
  if (
    existingPhoneNumber &&
    existingPhoneNumber._id.toString() !== customerIdFromUrl
  ) {
    return res.status(400).json({ message: "Phone number already in use" });
  }

  // If validation passes and no duplicates found, proceed to the next middleware or route handler
  next();
}