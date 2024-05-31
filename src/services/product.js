import nedb from "nedb-promises";

const database = new nedb({ filename: "product.db", autoload: true });

const defaultProducts = [
  {
    id: 1,
    title: "Bryggkaffe",
    desc: "Bryggd på månadens bönor.",
    price: 39,
  },
  {
    id: 2,
    title: "Caffè Doppio",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    id: 3,
    title: "Cappuccino",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    id: 4,
    title: "Latte Macchiato",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    id: 5,
    title: "Kaffe Latte",
    desc: "Bryggd på månadens bönor.",
    price: 54,
  },
  {
    id: 6,
    title: "Cortado",
    desc: "Bryggd på månadens bönor.",
    price: 39,
  },
];

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

// Initialize database with default data if empty
async function initializeDatabase() {
  try {
    const count = await database.count({});
    if (count === 0) {
      for (const product of defaultProducts) {
        await createProduct(product);
      }
      console.log("Default products inserted.");
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  initializeDatabase,
};
