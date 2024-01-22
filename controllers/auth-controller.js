const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const register = async (req, res) => {
  const { shop_name, email, password, country, address } = req.body;

  if (!shop_name || !email || !password || !country || !address) {
    return res.status(400).send("Please enter the required fields");
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newBusiness = {
    shop_name,
    country,
    address,
    email,
    password: hashedPassword,
  };

  try {
    await knex("shop").insert(newBusiness);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to register");
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }

  const shop = await knex("shop").where({ email: email }).first();
  if (!shop) return res.status(400).send("Invalid email");

  const isPasswordCorrect = bcrypt.compareSync(password, shop.password);

  if (!isPasswordCorrect) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { id: shop.id, email: shop.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
};

const loginGoogle = async (_req, _res) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.authenticate("google", {
    scope: ["email", "profile"],
  });
  console.log("login using google oauth");
};

const loginGoogleCallback = async (_req, _res) => {
  passport.authenticate("google", { failureRedirect: "/" }),
    function (_req, res) {
      res.redirect("/");
    };
};

module.exports = { register, loginGoogle, login, loginGoogleCallback };
