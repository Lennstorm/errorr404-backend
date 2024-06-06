import { database } from "../services/customers.js";

export async function findLoggedInCustomer() {
  try {
    const loggedInCustomer = await database.findOne({ loggedIn: true });
    return loggedInCustomer;
  } catch (error) {
    throw new Error("Failed to find the logged-in customer");
  }
}
