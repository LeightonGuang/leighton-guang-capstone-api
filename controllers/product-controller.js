const knex = require("knex")(require("../knexfile"));

const getAllProduct = async (_req, res) => {
  try {
    const data = await knex("product").select("*");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving all products: ${error}`);
  }
};

const getAllProductCategory = async (req, res) => {
  try {
    const data = await knex("product").distinct("category");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving all product categories: ${error}`);
  }
};

const getProductDetails = async (req, res) => {
  try {
    const data = await knex("product").where({ id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving product details: ${error}`);
  }
};

module.exports = {
  getAllProduct,
  getAllProductCategory,
  getProductDetails,
};
