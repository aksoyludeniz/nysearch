const express = require("express");
const router = express.Router()
const articlesController = require("../../controllers/articles");


// Book routes
router
  .route("/")
  .get(articlesController.findAll)
  .post(articlesController.create)

router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.delete)

module.exports = router;
