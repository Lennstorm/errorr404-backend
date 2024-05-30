import { Router } from "express";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../services/product.js";

const router = Router();

// Get all menu items
router.get("/", async (req, res) => {
  const menuItems = await getAllMenuItems();
  res.json(menuItems);
});

// Post new menu item
router.post("/", async (req, res) => {
  const newMenuItem = req.body;
  await createMenuItem(newMenuItem);
  res.status(201).json(newMenuItem);
});

// Get specific menu item by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const menuItem = await getMenuItemById(id);
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// Update menu item
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedMenuItem = req.body;
  await updateMenuItem(id, updatedMenuItem);
  res.json({ message: "Menu item updated successfully" });
});

// Delete menu item
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await deleteMenuItem(id);
  res.json({ message: "Menu item deleted successfully" });
});

export default router;
