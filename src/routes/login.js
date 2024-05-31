import { Router } from "express";
import { loginController } from "../controllers/loginController.js";

const router = Router();

// POST route for user login
router.post("/", loginController);

export default router;
