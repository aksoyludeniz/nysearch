const express = require("express");
const router = express.Router();

const articlesRoutes = require("./articles");
const newyRoutes = require("./newy");

router.use("/articles", articlesRoutes);
router.use("/newy", newyRoutes);

module.exports = router;
