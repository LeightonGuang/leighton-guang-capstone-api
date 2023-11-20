const router = require("express").Router();
const productController = require("../controllers/product-controller");

router.route("/").get(productController.getAllProduct);
router.route("/category").get(productController.getAllProductCategory);

module.exports = router;
