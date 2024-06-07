import { getCustomerById } from "./customers.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";

// Function to handle user logout
export async function logoutCustomer(customerId) {
  // Find the customer by ID
  const customer = await getCustomerById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  // Check if the customer is logged in
  if (!customer.loggedIn) {
    throw new Error("Customer is already logged out");
  }

  // Check if the customer is the guest
  if (customer._id === "guestintest") {
    const error = new Error("Guests can't log out. You're trapped here now.");
    error.statusCode = 400; // Custom property to hold status code
    throw error;
  }

  // Update the loggedIn status to false
  await updateCustomerLoggedInStatus(customer._id, false);

  // Automatically log in the guest user
  await updateCustomerLoggedInStatus("guestintest", true);

  return { message: "Logout successful" };
}
