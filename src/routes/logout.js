import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { preventGuest } from "../middleware/preventGuest.js";

const router = Router();

// POST route for user login
router.post("/", preventGuest, bodyContentBlocker, logoutController);

export default router;
