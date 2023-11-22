const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth-controller");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

module.exports = router;
