require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 5050;

const productRoutes = require("./routes/product-routes");
const shopRoutes = require("./routes/shop-routes");
const favouriteRoute = require("./routes/favourite-routes");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(helmet());

app.use((_req, _res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (_req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.get("/", (_req, res) => {
  res.send("Welcome to Shopdex API");
});

app.use("/api/product", productRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/favourite", favouriteRoute);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT} `);
});
