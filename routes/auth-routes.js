const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const authenticate = require("../middleware/authenticate");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/profile").get(authenticate, authController.profile);

module.exports = router;
