import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
  deleteOrderHistoryHandler,
} from "../controllers/orderHistoryController.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET route for fetching all order histories
router.get("/", bodyContentBlocker, getAllOrderHistoriesHandler);

// GET route for fetching an order history by NeDB _id
router.get("/:id", bodyContentBlocker, getOrderHistory);

// DELETE route for deleting an order history by NeDB _id
router.delete("/:id", bodyContentBlocker, deleteOrderHistoryHandler);

export default router;
