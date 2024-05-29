import express from "express";
import { validateUserData } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Route handler for creating a user
router.post("/", validateUserData, (req, res) => {
  // Logic to create a user
});

export default router;
