const models = require("../models");

module.exports = {
  findAll: (req, res) => {
    models.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    models.Article
      .findById(req.params.id)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    const article = {
      _id: req.body._id,
      title: req.body.headline.main,
      url: req.body.web_url
    };
    models.Article
      .create(article)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    models.Article
      .findById({ _id: req.params.id })
      .then(article => article.remove())
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  }
};