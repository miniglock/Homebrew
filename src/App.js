import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateRace from "./components/Create/race.jsx";
import Modules from "./components/Modules";
import ModuleShow from "./components/Modules/show";
import CreateModule from "./components/Create/module.jsx";
import ModuleUpdate from "./components/Modules/update.jsx";
import Classes from "./components/Classes";
import ClassShow from "./components/Classes/show.jsx";
import CreateClass from "./components/Create/class.jsx";
import ClassUpdate from "./components/Classes/update";
import Firebase from "./components/Firebase/firebase.js";

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

  componentDidMount = async () => {
    await Firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const user = await Firebase.database
          .collection("users")
          .doc(authUser.uid)
          .get();
        const oneDoc = { ...user.data(), uid: authUser.uid };
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
          <Route exact path="/modules" component={Modules} />
          <Route
            exact
            path="/modules/:moduleId"
            render={() => <ModuleShow currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path="/createmodule"
            render={() => <CreateModule currentUser={currentUser} />}
          />
          <Route
            exact
            path="/modules/:moduleId/update"
            component={ModuleUpdate}
          />
          <Route exact path="/classes" component={Classes} />
          <Route
            exact
            path="/classes/:classId"
            render={() => <ClassShow currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path="/createclass"
            render={() => <CreateClass currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path="/classes/:classId/update"
            component={ClassUpdate}
          />
          <Route exact path="/createrace" component={CreateRace} />
        </Switch>
      </div>
    );
  }
}

export default App;
