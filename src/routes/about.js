import { Router } from "express";
import { aboutInfo } from "../../config/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(aboutInfo);
});

export default router;

//GET localhost:3000/about
