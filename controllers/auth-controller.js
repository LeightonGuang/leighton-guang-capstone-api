const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");

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

const login = async (req, res) => {};

module.exports = { register, login };
