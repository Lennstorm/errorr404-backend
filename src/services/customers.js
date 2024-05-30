import nedb from "nedb-promises";
import customerSchema from "../models/customerSchema.js"; // Import the Joi schema for customer validation

const database = new nedb({ filename: "customers.db", autoload: true });

// Function to create a new customer
async function createCustomer(customerData) {
  // Validate the customer data against the schema
  const { error } = customerSchema.validate(customerData);
  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }

  try {
    const newCustomer = await database.insert(customerData);
    return newCustomer;
  } catch (error) {
    throw new Error("Failed to create customer");
  }
}

// Function to get all customers
async function getAllCustomers() {
  try {
    const customers = await database.find({});
    return customers;
  } catch (error) {
    throw new Error("Failed to fetch customers");
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
    throw new Error("Failed to fetch customer");
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
    throw new Error("Failed to update customer");
  }
}

// Function to delete a customer
async function deleteCustomer(id) {
  try {
    const numRemoved = await database.remove({ _id: id });
    if (numRemoved === 0) {
      throw new Error("Customer not found");
    }
    return "Customer deleted successfully";
  } catch (error) {
    throw new Error("Failed to delete customer");
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
};
