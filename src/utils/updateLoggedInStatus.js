import { database } from "../services/customers.js";

//Function that updates the loggedIn flag for a user
//This is being used when a customer is being deleted, logged out or logged in.
//If a customer logs out or deletes himself, set guest to logged in.
//If a customer logs in, log out the customer that is currently logged in.

export async function updateCustomerLoggedInStatus(customerId, status) {
  await database.update({ _id: customerId }, { $set: { loggedIn: status } });
}
