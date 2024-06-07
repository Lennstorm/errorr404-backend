import { loginCustomer } from "../services/login.js";

// Controller function for user login
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

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
