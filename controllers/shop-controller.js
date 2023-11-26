const knex = require("knex")(require("../knexfile"));

const getAllShop = async (_req, res) => {
  try {
    const data = await knex("shop").select("*");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

const getListingofAShop = async (req, res) => {
  try {
    const data = await knex
      .select("*")
      .from("shop")
      .join("listing", "shop.id", "listing.shop_id")
      .join("product", "listing.product_id", "product.id")
      .where({ shop_id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving listings of a shop: ${error}`);
  }
};

const getAllListing = async (_req, res) => {
  try {
    const data = await knex
      .select("*")
      .from("shop")
      .join("listing", "shop.id", "listing.shop_id")
      .join("product", "listing.product_id", "product.id");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving all listings: ${error}`);
  }
};

module.exports = {
  getAllShop,
  getListingofAShop,
  getAllListing,
};
