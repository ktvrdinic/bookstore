const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { loginCheck, isAuth } = require("../middleware/auth");

router.post("/signup", (req, res) => {authController.postSignup(req, res)});
router.post("/signin", (req, res) => {authController.postSignin(req, res)});

module.exports = router;