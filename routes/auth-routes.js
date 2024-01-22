const router = require("express").Router();
const authController = require("../controllers/auth-controller");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/login/google").get(authController.loginGoogle);
router.route("/google/callback").get(authController.loginGoogleCallback);

module.exports = router;
