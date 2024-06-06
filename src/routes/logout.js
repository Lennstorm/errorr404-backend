import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";

const router = Router();

// POST route for user login
router.post("/", bodyContentBlocker, logoutController);

export default router;
