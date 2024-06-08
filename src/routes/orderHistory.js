import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { validateAdmin } from "../middleware/adminValidation.js";

const router = express.Router();

// GET all order histories
router.get(
  "/all",
  validateAdmin,
  bodyContentBlocker,
  getAllOrderHistoriesHandler
);

// GET order history
router.get("/", preventGuest, bodyContentBlocker, getOrderHistory);

export default router;
