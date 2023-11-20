const router = require("express").Router();
const productController = require("../controllers/product-controller");

router.route("/").get(productController.getAllProduct);
router.route("/category").get(productController.getAllProductCategory);
router.route("/:id").get(productController.getProductDetails);

module.exports = router;
