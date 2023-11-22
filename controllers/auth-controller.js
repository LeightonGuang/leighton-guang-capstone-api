const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, country, address } = req.body;

  if (!name || !email || !password || !country || !address) {
    return res.status(400).send("Please enter the required fields");
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newBusiness = {
    name,
    email,
    password: hashedPassword,
    country,
    address,
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
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(404).send("Please enter the required fields");

  const business = await knex("shop").where({ email: email }).first();

  if (!business) return res.status(400).send("Invalid email");

  const isPasswordCorrect = bcrypt.compareSync(password, business.password);

  if (!isPasswordCorrect) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { id: business.id, email: business.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
};

module.exports = { register, login };
