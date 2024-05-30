import { Router } from "express";
import { createMenuItem } from "../services/product.js";

const router = Router();

//Post new movie
router.get("/", (req, res) => {
  createMenuItem(req.body);
  res.json({ message: "hello hello" });
});

export default router;

//GET localhost:3000/products
