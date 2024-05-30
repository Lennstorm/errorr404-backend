import express from "express";
import productRouter from "./src/routes/products.js";
import aboutRouter from "./src/routes/about.js";

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/products", productRouter);
app.use("/about", aboutRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
