import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { socket } from "../../utils/sockets";

import API from "../../utils/api";

import Article from


class Home extends Component {

  constructor(props) {
    super(props);

    this.getArticles = this.getArticles.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.clearArticles = this.clearArticles.bind(this);
    this.saveArticle = this.saveArticle.bind(this);

    this.state = {
      articles: [],
      q: "",
      start_year: "",
      end_year: "",
      message: "Pick a Category"
    };
  }

  getArticles() {
    API.getArticles({
      q: this.state.q,
      start_year: this.state.start_year,
      end_year: this.state.end_year
    }).then(res => {
      if (res.data.length > 0) {
        this.setState({
          articles: res.data,
          message: "Found " + res.data.length + " article" + (res.data.length === 1 ? "" : "s") + " for the query \"" + this.state.q + "\"."
        });
      } else {
        this.setState({
          articles: [],
          message: "No articles found for that query."
        });
      }
    }).catch(err => console.log(err));
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  search(event) {
    event.preventDefault();
    this.getArticles();
  }

  clearArticles(event) {
    event.preventDefault();
    this.setState({
      articles: [],
      message: "Articles cleared."
    });
  }

  saveArticle(article) {
    API.saveArticle(article).then(res => {
      this.getArticles();
      socket.emit("article_saved", res.data);
    });
  }

  render() {
    return (

      <div className="container py-4 App-header">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="jumbotron text-center">
               <nav class= "navbar navabar -light bg-light">
              <span class="navbar-brand mb-0 h1">Search IT from NY TIMES
              </span>
              <span>
              <Button color="warning">
              <Link to="/">Search</Link>
              </Button>
               <Button color="warning">
              <Link to="/saved">Saved</Link>
              </Button>
              </span>
              </nav>
              <p className="lead">You want it read it.</p>
              <hr className="my-4" />
            </div>
          </div>
          <div className="col-md-9 offset-md-3 mb-2">
            <div className="card">
              <div className="card-header">
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label html="q">Search it</label>
                    <input type="text" className="form-control" id="q" name="q" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="start_year">Start year</label>
                    <input type="text" className="form-control" id="start_year" name="start_year" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_year">End year</label>
                    <input type="text" className="form-control" id="end_year" name="end_year" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <button bsStyle="warning" onClick={this.search}> Search</button>
                    <button type="submit" className="btn btn-secondary" onClick={this.clearArticles}><i className="fas fa-trash"></i> Clear results</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="card mb-4">
              <div className="card-body">
              </div>
            </div>
            {this.state.articles.map(article => (
              <Article
                key={article._id}
                title={article.headline.main}
                url={article.web_url}
                date={article.pub_date}
                isSaved={false}
                onSave={() => this.saveArticle(article)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
