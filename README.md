# Shopdex Api

## Database tables

### shop

[DrawSql Link]("https://drawsql.app/teams/leighton/diagrams/shopdex)

| id  | name | email | password | address | created_at | edited_at |
| --- | ---- | ----- | -------- | ------- | ---------- | --------- |

### product

| id  | name | brand | model | category | description | created_at | edited_at |
| --- | ---- | ----- | ----- | -------- | ----------- | ---------- | --------- |

### listing

| product_id | shop_id | currency | price | created_at | edited_at |
| ---------- | ------- | -------- | ----- | ---------- | --------- |

## Endpoints

### Products

`/product`

- list of all the product

`/product/:id`

- product details

`/product/category`

- list of all the product categories

`/product/category/:id`

- list of all the product that is in that category
