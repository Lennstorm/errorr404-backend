import nedb from "nedb-promises";

const database = new nedb({ filename: "product.db", autoload: true });

// Add new menu item
async function createProduct(product) {
  try {
    const newProduct = await database.insert(product);
    console.log(newProduct);
  } catch (error) {
    console.error(error);
  }
}

// Get all menu items
async function getAllProducts() {
  try {
    const products = await database.find({});
    return products;
  } catch (error) {
    console.error(error);
  }
}

// Get specific menu item
async function getProductById(id) {
  try {
    return await database.findOne({ id: id });
  } catch (error) {
    console.error(error);
  }
}

// Update menu item
async function updateProduct(id, updatedProduct) {
  try {
    const product = await database.findOne({ id: id });
    return await database.update(
      { _id: product._id },
      { $set: updatedProduct }
    );
  } catch (error) {
    console.error(error);
  }
}

// Delete menu item
async function deleteProduct(id) {
  try {
    const deletedProduct = await database.remove({ id: id });
    console.log(deletedProduct);
  } catch (error) {
    console.error(error);
  }
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
