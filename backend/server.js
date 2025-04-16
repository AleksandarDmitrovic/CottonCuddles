import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
// Helmet is a security middleware that helps you protect your Express apps by setting various HTTP headers

app.get("/", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello from the backend!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});