import nedb from "nedb-promises";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";

const database = new nedb({ filename: "customers.db", autoload: true });
const defaultGuest = {
  firstName: "Guest",
  loggedIn: true,
  _id: "guestintest",
};

// Initialize database with default guest
export async function initializeCustomerDatabase() {
  try {
    // Check if there are any existing customers
    const existingCustomers = await database.find({});
    if (existingCustomers.length === 0) {
      // If no existing customers, insert default guest
      await database.insert(defaultGuest);
    }
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
    throw new Error("Failed to initialize database");
  }
}

// Function to create a new customer
async function createCustomer(customerData) {
  try {
    // Adding the loggedIn property to customerData
    const customerDataWithLoggedIn = { ...customerData, loggedIn: false };

    const newCustomer = await database.insert(customerDataWithLoggedIn);
    const message = `Customer Created. Welcome ${newCustomer.firstName}`;
    return { message, newCustomer };
  } catch (error) {
    throw new Error("Failed to create customer");
  }
}

// Function to get all customers
async function getAllCustomers() {
  try {
    const customers = await database.find({});
    if (customers.length === 0) {
      throw new Error("No customers found");
    }
    return customers;
  } catch (error) {
    throw Error(error.message);
  }
}

// Function to get a customer by ID
async function getCustomerById(id) {
  try {
    const customer = await database.findOne({ _id: id });
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    throw new Error("Failed to fetch customer.");
  }
}

// Function to update a customer
async function updateCustomer(id, updatedCustomerData) {
  try {
    const customer = await database.findOne({ _id: id });
    if (!customer) {
      throw new Error("Customer not found");
    }
    await database.update({ _id: id }, { $set: updatedCustomerData });
    return "Customer updated successfully";
  } catch (error) {
    throw Error(error.message);
  }
}

// Function to delete a customer
async function deleteCustomer(id) {
  try {
    const numRemoved = await database.remove({ _id: id });
    if (numRemoved === 0) {
      throw new Error("Customer not found");
    }

    // Automatically log in the guest user
    await updateCustomerLoggedInStatus("guestintest", true);

    return "Customer deleted successfully";
  } catch (error) {
    throw Error(error.message);
  }
}

// Function to find a customer by email
async function findCustomerByEmail(email) {
  try {
    const customer = await database.findOne({ email });
    return customer;
  } catch (error) {
    throw new Error("Failed to find customer by email");
  }
}

// Function to find a customer by phone number
async function findCustomerByPhoneNumber(phoneNumber) {
  try {
    const customer = await database.findOne({ phoneNumber });
    return customer;
  } catch (error) {
    throw new Error("Failed to find customer by phone number");
  }
}

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  findCustomerByEmail,
  findCustomerByPhoneNumber,
  database,
};
