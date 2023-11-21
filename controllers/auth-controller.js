const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, address, email, password } = req.body;

  if (!name || !address || !email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  const hasedPassword = bcrypt.hashSync(password);

  const newBusiness = {
    name,
    address,
    email,
    password,
  };

  try {
    await knex("shop").insert(newBusiness);
    res.status(201).send("Registered successfully");
  } catch (error) {
    res.status(400).send("Failed to register");
  }
};
