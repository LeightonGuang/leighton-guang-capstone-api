/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("shop", (table) => {
      table.increments("id").primary();
      table.string("shop_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("img_url", 500);
      table.string("country").notNullable();
      table.string("address").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })

    .createTable("product", (table) => {
      table.increments("id").primary();
      table.string("product_name").notNullable();
      table.string("img_url");
      table.string("brand").notNullable();
      table.string("model");
      table.string("category").notNullable();
      table.string("description");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })

    .createTable("listing", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("product.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("shop_id")
        .unsigned()
        .references("shop.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("currency").notNullable();
      table.integer("price").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })

    .createTable("saved", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("shop")
    .dropTable("product")
    .dropTable("listing")
    .dropTable("saved");
};
