// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/customersValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customersController.js";

const router = Router();

// URL for CRUD operations: localhost:3000/api/customers

// POST route for adding a new customer
router.post("/", validateCustomer, createCustomerController);

// GET route for fetching all customers
router.get("/", bodyContentBlocker, getAllCustomersController);

// GET route for fetching a customer by ID
router.get("/profile", bodyContentBlocker, getCustomerByIdController);

// PUT route for updating a customer by ID
router.put("/", validateCustomer, updateCustomerController);

// DELETE route for deleting a customer by ID
router.delete("/", bodyContentBlocker, deleteCustomerController);

export default router;
