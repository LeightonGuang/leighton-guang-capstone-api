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
    const listing = await knex("listing")
      .join("shop", "listing.shop_id", "shop.id")
      .select(
        "listing.id as listing_id",
        "shop.id as shop_id",
        "shop.shop_name",
        "shop.shop_logo_url",
        "shop.address",
        "listing.currency",
        "listing.price",
        "listing.updated_at as listing_updated_at"
      );
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).send(`Error retrieving all listings: ${error}`);
  }
};

const addListing = async (req, res) => {
  const { product_id, shop_id, currency, price } = req.body;

  if (!product_id || !shop_id || !currency || !price) {
    return res.status(400).send("Please enter the required fields");
  }

  const newListing = {
    product_id,
    shop_id,
    currency,
    price,
  };

  try {
    await knex("listing").insert(newListing);
    res.status(201).send("New listing craeted successfully");
  } catch (error) {
    res.status(400).send(`Error creating new listing: ${error}`);
  }
};

const profile = async (req, res) => {
  const shop = await knex("shop").where({ id: req.shop_id }).first();
  delete shop.password;
  res.send(shop);
};

const manageListing = async (req, res) => {
  try {
    const listing = await knex("listing")
      .join("shop", "listing.shop_id", "shop.id")
      .join("product", "listing.product_id", "product.id")
      .select(
        "shop.id as shop_id",
        "product.id as product_id",
        "listing.id as listing_id",
        "listing.*",
        "product.*",
        "shop.*"
      )
      .where({ shop_id: req.params.id });
    delete listing.password;
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).send(`Error retrieving listings for a shop: ${error}`);
  }
};

const shopDeleteListing = async (req, res) => {
  try {
    await knex("listing").where({ id: req.params.listing_id }).del();
  } catch (error) {
    res.status(400).send(`Error deleting listing: ${error}`);
  }
};

module.exports = {
  getAllShop,
  getListingofAShop,
  getAllListing,
  manageListing,
  addListing,
  profile,
  shopDeleteListing,
};
