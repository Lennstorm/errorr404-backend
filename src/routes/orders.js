import express from "express";
import { createOrder } from "../services/orders.js";
import { getCart } from "../routes/cart.js"; // Import the getCart function

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = getCart(userId); // Fetch the user's specific cart

    const result = await createOrder(userId, cart); // Pass the cart to createOrder
    cart.length = 0; // Clear the cart after placing the order

    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
