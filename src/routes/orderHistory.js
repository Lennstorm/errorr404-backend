import express from "express";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
  deleteOrderHistoryHandler,
} from "../controllers/orderHistoryController.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET route for fetching all order histories
router.get("/", getAllOrderHistoriesHandler);

// GET route for fetching an order history by NeDB _id
router.get("/:id", getOrderHistory);

// DELETE route for deleting an order history by NeDB _id
router.delete("/:id", deleteOrderHistoryHandler);

export default router;
