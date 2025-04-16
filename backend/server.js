import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log("PORT :", PORT);

app.use(express.json());
app.use(cors());
app.use(helmet());
// Helmet is a security middleware that helps you protect your Express apps by setting various HTTP headers
app.use(morgan("dev"));
// Log the requests to the console

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});