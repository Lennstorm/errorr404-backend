import express from "express";
import customerRouter from "./src/routes/customers.js";
import productRouter from "./src/routes/products.js";
import aboutRouter from "./src/routes/about.js";
import cartRouter from "./src/routes/cart.js";
import cors from "cors";
import { initializeDatabase } from "./src/services/product.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/customers", customerRouter);
app.use("/api/products", productRouter);
app.use("/about", aboutRouter);
app.use('/cart', cartRouter);

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
