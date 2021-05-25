const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const { loginCheck } = require("../middleware/auth");

router.post("/insert", loginCheck, (req, res) => { bookController.insertBook(req, res) });
router.put("/update", loginCheck, (req, res) => { bookController.updateBook(req, res) });
router.post("/delete", loginCheck, (req, res) => { bookController.deleteBook(req, res) });


module.exports = router;