import { database, findCustomerByEmail } from "./customers.js";

// Function to update the customer's loggedIn status
export async function updateCustomerLoggedInStatus(customerId, status) {
  // Update the customer's loggedIn status in the database
  await database.update({ _id: customerId }, { $set: { loggedIn: status } });

  // Return the updated customer object
  return await database.findOne({ _id: customerId });
}

// Function to handle user login
export async function loginCustomer(email, password) {
  // Find the customer by email
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    throw new Error("Invalid email");
  }

  // Check if the password matches
  if (customer.password === password) {
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
