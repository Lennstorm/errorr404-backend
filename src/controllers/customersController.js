import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customers.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

// Controller function for creating a new customer
export async function createCustomerController(req, res) {
  try {
    const newCustomer = req.body;
    const createdCustomer = await createCustomer(newCustomer);
    res.status(201).json(createdCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Controller function for fetching all customers
export async function getAllCustomersController(req, res) {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Controller function for fetching a customer by ID
export async function getCustomerByIdController(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;
    const customer = await getCustomerById(customerId);
    res.json(customer);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Customer not found", error: error.message });
  }
}

// Controller function for updating a customer by ID
export async function updateCustomerController(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;
    const updatedCustomerData = req.body;
    await updateCustomer(customerId, updatedCustomerData);
    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Controller function for deleting a customer by ID
export async function deleteCustomerController(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;
    const customer = await getCustomerById(customerId);
    await deleteCustomer(customerId);
    res.status(200).json({
      message: `Customer deleted successfully. Bye ${customer.firstName}`,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
}
