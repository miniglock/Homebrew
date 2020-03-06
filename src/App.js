import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Modules from "./components/Modules";
import ModuleShow from "./components/Modules/show";
import CreateModule from "./components/Create/module.jsx";
import ModuleUpdate from "./components/Modules/update.jsx";
import Classes from "./components/Classes";
import ClassShow from "./components/Classes/show.jsx";
import CreateClass from "./components/Create/class.jsx";
import ClassUpdate from "./components/Classes/update";
import Races from "./components/Races";
import RaceShow from "./components/Races/show.jsx";
import CreateRace from "./components/Create/race.jsx";
import RaceUpdate from "./components/Races/update.jsx";
import Firebase from "./components/Firebase/firebase.js";
import LandingPage from "./components/LandingPage";

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false,
    modules: [],
    classes: [],
    races: []
  };

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false
    });
  };

  onLoad = async () => {
    const modulesRef = await Firebase.database
      .collection("modules")
      .orderBy("name")
      .limit(3)
      .get();
    this.setState({
      modules: modulesRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    });

    const classesRef = await Firebase.database
      .collection("classes")
      .orderBy("name")
      .limit(3)
      .get();
    this.setState({
      classes: classesRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    });

    const racesRef = await Firebase.database
      .collection("races")
      .orderBy("name")
      .limit(3)
      .get();
    this.setState({
      races: racesRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    });
  };

  componentDidMount = async () => {
    this.onLoad();
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
          <Route exact path="/races" component={Races} />
          <Route
            exact
            path="/races/:raceId"
            render={() => <RaceShow currentUser={currentUser} />}
          />
          <Route
            exact
            path="/createrace"
            render={() => <CreateRace currentUser={currentUser} />}
          />
          <Route exact path="/races/:raceId/update" component={RaceUpdate} />
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage
                modules={this.state.modules}
                classes={this.state.classes}
                races={this.state.races}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
