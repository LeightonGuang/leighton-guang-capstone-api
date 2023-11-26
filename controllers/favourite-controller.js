const { uuid } = require("uuidv4");

const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

//create new user info for local storage
const createUserInfo = async (_req, res) => {
  try {
    const newUserId = uuid();
    res.status(200).json(newUserId);
  } catch (error) {
    res.status(400).send(`Error creating new users: ${error}`);
  }
};

const getFavourite = async (req, res) => {
  try {
    const saved = await knex("saved")
      .join("listing", "saved.listing_id", "listing.id")
      .join("product", "listing.product_id", "product.id")
      .where("saved.user_id", req.params.id)
      .select(
        "listing.id as listing_id",
        "product.id as product_id",
        "currency",
        "price",
        "product_name",
        "product_img_url"
      );
    res.status(200).json(saved);
  } catch (error) {
    res.status(400).send(`Error retrieving favourite list: ${error}`);
  }
};

const putFavourite = async (req, res) => {
  try {
    const { user_id, listing_id } = req.body;

    if (!user_id || !listing_id) {
      return res
        .status(400)
        .json({ error: "user_id and listing_id are required" });
    }

    const existingRecord = await knex("saved")
      .where({ user_id, listing_id })
      .first();

    if (existingRecord) {
      await knex("saved").where({ user_id, listing_id }).del();
      res.status(200).json({ message: "Removed favourite" });
    } else if (!existingRecord) {
      await knex("saved").insert(req.body);
      res.status(200).json({ message: "Listing added to favourites" });
    }
  } catch (error) {
    res.status(400).send(`Error putting favourite: ${error}`);
  }
};

const delFavourite = async (req, res) => {};

module.exports = {
  index,
  createUserInfo,
  getFavourite,
  putFavourite,
  delFavourite,
};
