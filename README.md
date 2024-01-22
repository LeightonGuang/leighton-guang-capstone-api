# Shopdex Api

[DrawSql]("https://drawsql.app/teams/leighton/diagrams/shopdex)

## Database tables

### Shop

| id  | name | email | password | address | created_at | edited_at |
| --- | ---- | ----- | -------- | ------- | ---------- | --------- |

### Product

| id  | product_name | product_img_url | brand | model | category | description | created_at | edited_at |
| --- | ------------ | --------------- | ----- | ----- | -------- | ----------- | ---------- | --------- |

### Listing

| id  | product_id | shop_id | currency | price | created_at | edited_at |
| --- | ---------- | ------- | -------- | ----- | ---------- | --------- |

### Saved

| id  | user_id | listing_id | created_at |
| --- | ------- | ---------- | ---------- |

## API Endpoints

### Product Endpoints

| Method | Endpoints                  | Action                                      |
| ------ | -------------------------- | ------------------------------------------- |
| GET    | `api/product`              | Retrieve list of all products               |
| POST   | `api/product`              | Create new product                          |
| GET    | `api/product/category`     | Retrieve all product categories             |
| GET    | `api/product/category/:id` | Retrieve all products by category           |
| GET    | `api/product/:id`          | Retrieve product details by id              |
| GET    | `api/product/:id/listing`  | Retrieve all listings of that product by id |

### Shop Endpoints

| Method | Endpoints              | Action                                   |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `api/shop`             | Retrieve all shops                       |
| GET    | `api/shop/listing`     | Retrieve all listings                    |
| POST   | `api/shop/listing`     | Add listing                              |
| GET    | `api/shop/profile`     | Retrieve all shop info except password   |
| GET    | `api/shop/:id/listing` | Retrieve all listings of that shop by id |

### Favourite Endpoints

| Method | Endpoints                  | Action                                         |
| ------ | -------------------------- | ---------------------------------------------- |
| PUT    | `api/favourite`            | Replace favourite list                         |
| GET    | `api/favourite/new-user`   | Create new user profile                        |
| GET    | `api/favourite/:id`        | Retrieve all favourited products of user by id |
| DELETE | `api/favourite/delete/:id` | Delete a product from favourite by id          |

### Authentication Endpoints

| Method | Endpoints       | Action                              |
| ------ | --------------- | ----------------------------------- |
| POST   | `auth/register` | Add a new user account              |
| POST   | `auth/login`    | Return jwt token when authenticated |
