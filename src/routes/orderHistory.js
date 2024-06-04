import express from "express";
import {
  getOrderHistory,
  updateOrderHistory,
  getAllOrderHistoriesHandler,
  deleteOrderHistoryHandler,
} from "../controllers/orderHistoryController.js";
import validateOrderHistory from "../middleware/orderHistoryValidation.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET route for fetching all order histories
router.get("/", getAllOrderHistoriesHandler);

// GET route for fetching an order history by NeDB _id
router.get("/:id", getOrderHistory);

// POST route for adding a new order history
router.post("/", validateOrderHistory, updateOrderHistory);

// DELETE route for deleting an order history by NeDB _id
router.delete("/:id", deleteOrderHistoryHandler);

export default router;
