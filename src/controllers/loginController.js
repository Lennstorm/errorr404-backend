import { findCustomerByEmail } from "../services/customers.js";

// Controller function for user login
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const customer = await findCustomerByEmail(email);

    if (!customer) {
      // If the email does not exist, return an error
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check password
    if (customer.password === password) {
      // If the password matches, return a success message
      return res.status(200).json({ message: "Login successful" });
    } else {
      // If the password does not match, return an error
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    // If an error occurs, return a server error response
    return res.status(500).json({ message: "Internal server error" });
  }
}
