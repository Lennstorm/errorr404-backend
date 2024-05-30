// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/validationMiddleware.js"; // Import the validation middleware
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customers.js"; // Import the service functions for CRUD operations

const router = Router();

// POST route for adding a new customer
router.post("/", validateCustomer, async (req, res) => {
  try {
    const newCustomer = req.body;
    // Call the service function to create a new customer
    const createdCustomer = await createCustomer(newCustomer);
    // Respond with the created customer
    res.status(201).json(createdCustomer);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

// GET route for fetching all customers
router.get("/", async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

// GET route for fetching a customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await getCustomerById(customerId);
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: "Customer not found", error: error });
  }
});

// PUT route for updating a customer by ID
router.put("/:id", validateCustomer, async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;
    await updateCustomer(customerId, updatedCustomerData);
    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

// DELETE route for deleting a customer by ID
router.delete("/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    await deleteCustomer(customerId);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

export default router;
