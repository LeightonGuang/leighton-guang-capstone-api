const knex = require("knex")(require("../knexfile"));

const getAllProduct = async (_req, res) => {
  try {
    const data = await knex("product").select("*");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving all products: ${error}`);
  }
};

const getAllProductCategory = async (_req, res) => {
  try {
    const data = await knex("product").distinct("category");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving all product categories: ${error}`);
  }
};

const getAllProductInCategory = async (req, res) => {
  try {
    const data = await knex("product").where({ category: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .send(`Error retrieving all product in ${req.params.id}: ${error}`);
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

const getListing = async (req, res) => {
  try {
    const listing = await knex("listing")
      .where({ product_id: req.params.id })
      .join("shop", "listing.shop_id", "shop.id")
      .select(
        "listing.id as listing_id",
        "shop.id as shop_id",
        "shop.shop_name",
        "shop.shop_logo_url",
        "listing.currency",
        "listing.price",
        "listing.updated_at as listing_updated_at"
      );
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).send(`Error retrieving product listing: ${error}`);
  }
};

module.exports = {
  getAllProduct,
  getAllProductCategory,
  getProductDetails,
  getAllProductInCategory,
  getListing,
};
