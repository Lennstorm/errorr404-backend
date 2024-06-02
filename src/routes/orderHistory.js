import express from "express";
import {
  getOrderHistory,
  updateOrderHistory,
  getAllOrderHistoriesHandler,
  deleteOrderHistoryHandler,
} from "../controllers/orderHistoryController.js";
import validateOrderHistory from "../middleware/orderHistoryValidation.js";

const router = express.Router();

//URL for CRUD operations: localhost:3000/api/order-history

// GET route for fetching all order histories
router.get("/", getAllOrderHistoriesHandler);

// GET route for fetching an order history by userID
router.get("/:userId", getOrderHistory);

// POST route for adding a new order history
router.post("/", validateOrderHistory, updateOrderHistory);

// DELETE route for deleting a order history by userID
router.delete("/:userId", deleteOrderHistoryHandler);

export default router;
