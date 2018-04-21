const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({

 _id: {
   type: mongoose.Schema.Types.ObjectId,
   required: true
 },
 title: {
   type: String,
   required: true
 },
  url: {
  type: String,
  required: true
},
  date: {
  type: Date,
  default: Date.now
}

}, { _id:false});

module.exports = mongoose.model("Article", ArticleSchema);
