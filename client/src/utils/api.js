import axios from "axios";
import filterParams from "./filterParams";

export default {
  // get articles from NYT API
  getArticles: params => {
    return axios.get("/api/newy", { params: filterParams(params) });
  },
  // get all saved articles
  getSavedArticles: () => {
    return axios.get("/api/articles");
  },
  // delete a saved article
  deleteArticle: articleId => {
    return axios.delete("/api/articles/" + articleId);
  },
  // save an article
  saveArticle: article => {
    return axios.post("api/articles", article);
  }
};
