import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false
  };

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false
    });
  };
  render() {
    const { isLoggedIn, currentUser } = this.state;
    return (
      <div>
        <Navbar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          doSetCurrentUser={this.doSetCurrentUser}
        />

        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/login"
            render={() => <Login doSetCurrentUser={this.doSetCurrentUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup doSetCurrentUser={this.doSetCurrentUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
