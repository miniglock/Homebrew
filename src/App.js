import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateModule from "./components/Create/module.jsx";
import CreateRace from "./components/Create/race.jsx";
import CreateClass from "./components/Create/class.jsx";
import Modules from "./components/Modules";
import Firebase from "./components/Firebase/firebase.js";
import ModuleShow from "./components/Modules/show";

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false
  };

  // doSetCurrentUser = currentUser => {
  //   this.setState({
  //     currentUser,
  //     isLoggedIn: currentUser ? true : false
  //   });
  //   console.log("line26: ", this.currentUser);
  // };

  componentDidMount = async () => {
    await Firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        console.log("logged in: ", authUser);
        const user = await Firebase.database
          .collection("users")
          .get(authUser.id);
        // console.log("cur use: ", user.docs[0].data());
        const oneDoc = user.docs[0].data();
        this.setState({
          currentUser: oneDoc,
          isLoggedIn: true
        });
      } else {
        console.log("logged out ");
      }
    });
  };

  render() {
    const { isLoggedIn, currentUser } = this.state;
    console.log(this.state.currentUser);
    return (
      <div>
        <Navbar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          doSetCurrentUser={this.doSetCurrentUser}
        />
        <h1>Welcome to HomeBrew</h1>
        <h2>Your one stop shop for D&D 5E Homebrewed content</h2>
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
          <Route exact path="/createmodule" component={CreateModule} />
          <Route
            exact
            path="/createclass"
            render={() => <CreateClass currentUser={this.currentUser} />}
          />
          <Route exact path="/createrace" component={CreateRace} />
          <Route exact path="/modules" component={Modules} />
          <Route exact path="/modules/:moduleId" component={ModuleShow} />
        </Switch>
      </div>
    );
  }
}

export default App;
