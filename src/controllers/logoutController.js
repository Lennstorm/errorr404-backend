import { logoutCustomer } from "../services/logout.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

// Controller function for user logout
export async function logoutController(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;

    // Call the logout service function
    const response = await logoutCustomer(customerId);

    // Return a success response
    return res.status(200).json(response);
  } catch (error) {
    // If a custom status code is set, use it; otherwise, default to 500
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
}
