import express from "express";
import productRouter from "./src/routes/products.js";

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/products", productRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
