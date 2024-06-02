import express from "express";
import customerRouter from "./src/routes/customers.js";
import productRouter from "./src/routes/products.js";
import aboutRouter from "./src/routes/about.js";
import cartRouter from "./src/routes/cart.js";
import loginRouter from "./src/routes/login.js";
import ordersRouter from "./src/routes/orders.js";
import orderHistoryRouter from "./src/routes/orderHistory.js";
import cors from "cors";
import { getCustomerById } from "./src/services/customers.js";
import { initializeDatabase } from "./src/services/product.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/customers", customerRouter);
app.use("/api/login", loginRouter);
app.use("/about", aboutRouter);

// Route middleware for protected routes
app.use("/:id", async (req, res, next) => {
  try {
    await getCustomerById(req.params.id); // Ensure this is correctly called
    next();
  } catch (error) {
    // Return the error message from the service function
    return res.status(404).json({ message: error.message });
  }
});

//Protected routes
app.use("/:id/products", productRouter);
app.use("/:id/cart", cartRouter);
app.use("/:id/orders", ordersRouter);
app.use("/:id/api/order-history", orderHistoryRouter);

// Initialize the database with default data if empty, then start the server
const PORT = process.env.PORT || 3000;
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the database:", error);
    process.exit(1);
  });
