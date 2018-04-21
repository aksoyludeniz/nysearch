const express = require("express");
const router = express.Router();

const newyController = require("../../controllers/newy");

router
 .route("/")
 .get(newyController.findAll)

 module.exports = router;
