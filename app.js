import express from "express";
import cors from "cors";

import { initializeDatabase } from "./src/services/product.js"; //product database
import { initializeCustomerDatabase } from "./src/services/customers.js";

import cartRouter from "./src/routes/cart.js";
import aboutRouter from "./src/routes/about.js";
import loginRouter from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import ordersRouter from "./src/routes/orders.js";
import orderHistoryRouter from "./src/routes/orderHistory.js";
import customerRouter from "./src/routes/customers.js";
import productRouter from "./src/routes/products.js";

import {
  logCartParam,
  logOrderHistory,
  logOrdersParam,
} from "./src/middleware/routeConsoleLogs.js";

import protectedRoute from "./src/middleware/protectedRoutes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/customers", customerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/about", aboutRouter);
app.use("/products", productRouter);
app.use("/cart", logCartParam, cartRouter);
app.use("/orders", logOrdersParam, ordersRouter);
app.use("/order-history", logOrderHistory, orderHistoryRouter);

// Initialize both databases with default data if empty, then start the server
const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => initializeCustomerDatabase())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the databases:", error);
    process.exit(1);
  });
