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
  try {
    const menuItems = await getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving menu items", error });
  }
});

// Post new menu item
router.post("/", async (req, res) => {
  try {
    const newMenuItem = req.body;
    await createMenuItem(newMenuItem);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item", error });
  }
});

// Get specific menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const menuItem = await getMenuItemById(id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving menu item", error });
  }
});

// Update menu item
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedMenuItem = req.body;
    await updateMenuItem(id, updatedMenuItem);
    res.json({ message: "Menu item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error });
  }
});

// Delete menu item
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteMenuItem(id);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error });
  }
});

export default router;
