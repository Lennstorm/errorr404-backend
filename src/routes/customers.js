// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/customersValidation.js";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customersController.js";

const router = Router();

// POST route for adding a new customer
router.post("/", validateCustomer, createCustomerController);

// GET route for fetching all customers
router.get("/", getAllCustomersController);

// GET route for fetching a customer by ID
router.get("/:id", getCustomerByIdController);

// PUT route for updating a customer by ID
router.put("/:id", validateCustomer, updateCustomerController);

// DELETE route for deleting a customer by ID
router.delete("/:id", deleteCustomerController);

export default router;
