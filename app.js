import express from "express";
import customerRouter from "./src/routes/customers.js";
import productRouter from "./src/routes/products.js";
import aboutRouter from "./src/routes/about.js";
import cors from "cors";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/customers", customerRouter);
app.use("/api/products", productRouter);
app.use("/about", aboutRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
