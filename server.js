require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5050;

const productRoutes = require("./routes/product-routes");

app.use(cors());
app.use(express.json());

app.use((_req, _res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.get("/", (_req, res) => {
  res.send("Welcome to Shopdex API");
});

app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT} `);
});