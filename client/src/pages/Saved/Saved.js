import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { subscribeToArticleNotifications } from "../../utils/sockets";

import API from "../../utils/api";

import Article from "../../components/Article";

class Saved extends Component {

  constructor(props) {
    super(props);

    this.loadArticles = this.loadArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      loaded: false,
      articles: []
    }

    this.loadArticles();

    subscribeToArticleNotifications(article => {
      this.loadArticles();
    })
  }

  loadArticles() {
    API.getSavedArticles()
      .then(res => {
        this.setState({
          loaded: true,
          articles: res.data
        });
      });
  }

  deleteArticle(articleId) {
    API.deleteArticle(articleId).then(res => this.loadArticles());
  }

  render() {
    return (
      <div className="container py-4 app-header">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="jumbotron text-center">
            <nav class= "navbar navabar -light bg-light">
              <span class="navbar-brand mb-0 h1">Search IT from NY TIMES
              </span>
              <Button color="info">
              <Link to="/">Search</Link>
                </Button>
              <Button color="info">
                <Link to="/saved">
                Saved</Link>
                </Button>
              </nav>
              <p className="lead">Search and save articles using the NYT Article API.</p>
              <hr className="my-4" />
            </div>
          </div>
          <div className="col-md-10 offset-md-1">
            {this.state.loaded ? (
              <div className="card mb-4">
                <div className="card-body">
                  {this.state.articles.length === 1 ? (
                    <p className="text-center m-0">There is one article saved.</p>
                  ) : (
                    <p className="text-center m-0">There are {this.state.articles.length} articles saved.</p>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {this.state.articles.map(article => (
              <Article
                key={article._id}
                title={article.title}
                url={article.url}
                date={article.date}
                isSaved={true}
                onDelete={() => this.deleteArticle(article._id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Saved;
