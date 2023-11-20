/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const shopData = require("../seed-data/shops");
const productData = require("../seed-data/products");

exports.seed = async function (knex) {
  await knex("shop").del();
  await knex("shop").insert(shopData);

  await knex("product").del();
  await knex("product").insert(productData);
};
