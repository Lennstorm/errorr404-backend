import { findCustomerByEmail, getAllCustomers } from "./customers.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";

// Function to handle user login
export async function loginCustomer(email, password) {
  // Find the customer by email
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    throw new Error("Invalid email");
  }

  // Check if the password matches
  if (customer.password === password) {
    // Check if another customer is logged in
    const customers = await getAllCustomers();
    const loggedInCustomer = customers.find((customer) => customer.loggedIn);

    // If another customer is logged in, set their loggedIn status to false
    if (loggedInCustomer) {
      await updateCustomerLoggedInStatus(loggedInCustomer._id, false);
    }
    // Update the loggedIn status to true and get the updated customer
    const updatedCustomer = await updateCustomerLoggedInStatus(
      customer._id,
      true
    );
    return { message: "Login successful", customer: updatedCustomer };
  } else {
    throw new Error("Invalid password");
  }
}
