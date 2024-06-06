import { getCustomerById } from "../services/customers.js";

// Validation middleware for logout
export async function validateLogout(req, res, next) {
  const { customerId } = req.params;

  try {
    const customer = await getCustomerById(customerId);

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    if (!customer.loggedIn) {
      return res
        .status(400)
        .json({ message: "Customer is already logged out" });
    }

    next();
  } catch (error) {
    return res.status(404).json({ message: "Customer not found" });
  }
}
