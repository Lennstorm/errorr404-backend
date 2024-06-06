import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET route for fetching all order histories
router.get("/all", bodyContentBlocker, getAllOrderHistoriesHandler);

// GET route for fetching an order history
router.get("/", bodyContentBlocker, getOrderHistory);

export default router;
