// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/customersValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  createCustomerController,
  //getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customersController.js";
import { preventGuest } from "../middleware/preventGuest.js";

const router = Router();

// URL for CRUD operations: localhost:3000/api/customers

// POST route for adding a new customer
router.post("/", validateCustomer, createCustomerController);

/* // GET route for fetching all customers
router.get("/", bodyContentBlocker, getAllCustomersController);
 */

// GET route for customer profile
router.get("/profile", bodyContentBlocker, getCustomerByIdController);

// PUT route for updating customer info
router.put("/", preventGuest, validateCustomer, updateCustomerController);

// DELETE route for deleting customer
router.delete("/", preventGuest, bodyContentBlocker, deleteCustomerController);

export default router;
