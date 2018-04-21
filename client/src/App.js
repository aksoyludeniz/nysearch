import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import { subscribeToArticleNotifications } from "./utils/sockets";

import Home from "./pages/Home";
import Saved from "./pages/Saved";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notification: ""
    };

    subscribeToArticleNotifications(article => {
      this.setState({
        notification: "The article \"" + article.title + "\" was saved!"
      });
      let notification = document.querySelector('.notification');
      notification.classList.add("fade-in");
      setTimeout(() => {
        notification.classList.remove("fade-in");
      }, 5000)
    });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container fixed-top py-4 notification">
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-success" role="alert">
                  {this.state.notification}
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={Saved} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;