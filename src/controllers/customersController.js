import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  findCustomerByEmail,
  findCustomerByPhoneNumber,
} from "../services/customers.js";

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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Controller function for fetching a customer by ID
export async function getCustomerByIdController(req, res) {
  try {
    const customerId = req.params.id;
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
    const customerId = req.params.id;
    const updatedCustomerData = req.body;
    await updateCustomer(customerId, updatedCustomerData);
    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Controller function for deleting a customer by ID
export async function deleteCustomerController(req, res) {
  try {
    const customerId = req.params.id;
    await deleteCustomer(customerId);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}