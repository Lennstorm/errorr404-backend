import { Router } from "express";
import { validateProduct } from "../middleware/validationMiddleware.js"; // Import the validation middleware
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.js";

const router = Router();

// URL for CRUD operations: localhost:3000/api/products

// GET all menu items
router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

// POST new menu item
router.post("/", validateProduct, async (req, res) => {
  const newProduct = req.body;
  await createProduct(newProduct);
  res.status(201).json(newProduct);
});

// GET specific menu item by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = await getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// UPDATE menu item
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedProduct = req.body;
  await updateProduct(id, updatedProduct);
  res.json({ message: "Menu item updated successfully" });
});

// DELETE menu item
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await deleteProduct(id);
  res.json({ message: "Menu item deleted successfully" });
});

export default router;
