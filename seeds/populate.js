/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const shopData = require("../seed-data/shops");
const productData = require("../seed-data/products");
const listingData = require("../seed-data/listing");

exports.seed = async function (knex) {
  await knex("shop").del();
  await knex("shop").insert(shopData);

  await knex("product").del();
  await knex("product").insert(productData);

  await knex("listing").del();
  await knex("listing").insert(listingData);
};
