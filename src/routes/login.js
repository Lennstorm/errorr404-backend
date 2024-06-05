import { Router } from "express";
import { loginController } from "../controllers/loginController.js";
import { validateLogin } from "../middleware/loginValidation.js";

const router = Router();

//URL for CRUD operations: localhost:3000/api/login

// POST route for user login
router.post("/", validateLogin, loginController);

export default router;
