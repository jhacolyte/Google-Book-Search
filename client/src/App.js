import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
       <div className="container">
       <Nav />
       <Switch>
        <Route exact path ="/" component={Books} />
        <Route exact path = "/saved" component={Saved} />
        <Route component ={NoMatch} />
       </Switch>
       </div>
      </Router>

    );
  }
}

export default App;
