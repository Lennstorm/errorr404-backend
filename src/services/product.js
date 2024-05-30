import nedb from "nedb-promises";

const database = new nedb({ filename: "product.db", autoload: true });

// Add new menu item
async function createMenuItem(menuItem) {
  try {
    const newMenuItem = await database.insert(menuItem);
    console.log(newMenuItem);
  } catch (error) {
    console.error(error);
  }
}

// Get all menu items
async function getAllMenuItems() {
  try {
    const menuItems = await database.find({});
    return menuItems;
  } catch (error) {
    console.error(error);
  }
}

// Get specific menu item
async function getMenuItemById(id) {
  try {
    return await database.findOne({ id: id });
  } catch (error) {
    console.error(error);
  }
}

// Update menu item
async function updateMenuItem(id, updatedMenuItem) {
  try {
    const menuItem = await database.findOne({ id: id });
    return await database.update(
      { _id: menuItem._id },
      { $set: updatedMenuItem }
    );
  } catch (error) {
    console.error(error);
  }
}

// Delete menu item
async function deleteMenuItem(id) {
  try {
    const deletedMenuItem = await database.remove({ id: id });
    console.log(deletedMenuItem);
  } catch (error) {
    console.error(error);
  }
}

export {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
