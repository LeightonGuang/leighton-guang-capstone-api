const router = require("express").Router();
const productController = require("../controllers/product-controller");
const authenticate = require("../middleware/authenticate");

router.route("/").get(productController.getAllProduct);
router.route("/").post(authenticate, productController.createNewProduct);
router.route("/category").get(productController.getAllProductCategory);
router.route("/category/:id").get(productController.getAllProductInCategory);
router.route("/:id").get(productController.getProductDetails);
router.route("/:id/listing").get(productController.getListing);

module.exports = router;
