# Shopdex Api

## Database tables

### shop

| id  | name | email | password | address | created_at | edited_at |
| --- | ---- | ----- | -------- | ------- | ---------- | --------- |

### product

| id  | name | brand | model | category | description | created_at | edited_at |
| --- | ---- | ----- | ----- | -------- | ----------- | ---------- | --------- |

### listing

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
