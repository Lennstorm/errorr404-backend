import { Router } from "express";
import { menu } from "../../config/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(menu);
});

export default router;

//GET localhost:3000/products
