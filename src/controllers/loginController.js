import {
  loginCustomer,
  updateCustomerLoggedInStatus,
} from "../services/login.js";
import { getAllCustomers } from "../services/customers.js";

// Controller function for user login
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if another customer is logged in
    const customers = await getAllCustomers();
    const loggedInCustomer = customers.find((customer) => customer.loggedIn);

    // If another customer is logged in, set their loggedIn status to false
    if (loggedInCustomer) {
      await updateCustomerLoggedInStatus(loggedInCustomer._id, false);
    }

    // Log in the new customer
    const { message, customer } = await loginCustomer(email, password);

    // Return a success response
    return res.status(200).json({ message, customer });
  } catch (error) {
    // If an error occurs, return an error response
    const statusCode =
      error.message === "Invalid email" || error.message === "Invalid password"
        ? 400
        : 500;
    return res.status(statusCode).json({ message: error.message });
  }
}
