import express from "express";
import { createOrder, getAllOrders, getOrderById } from "../services/orders.js";
import { getCart } from "../routes/cart.js"; // Import the getCart function

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const userId = req.params.id;
  const cart = getCart(userId); // Fetch the user's specific cart

  const result = await createOrder(userId, cart); // Pass the cart to createOrder
  res.status(result.status).json(result.response); // Send the response returned from createOrder
});

router.get("/", async (req, res) => {
  const userId = req.params.id;
  const result = await getAllOrders(userId);
  res.status(result.status).json(result.response);
});

router.get("/:orderId", async (req, res) => {
  const userId = req.params.id;
  const orderId = req.params.orderId;
  const result = await getOrderById(userId, orderId);
  res.status(result.status).json(result.response);
});



export default router;
