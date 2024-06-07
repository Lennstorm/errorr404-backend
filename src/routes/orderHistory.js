import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  //getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";
import { preventGuest } from "../middleware/preventGuest.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET all order histories
//router.get("/all", bodyContentBlocker, getAllOrderHistoriesHandler);

// GET order history
router.get("/", preventGuest, bodyContentBlocker, getOrderHistory);

export default router;
