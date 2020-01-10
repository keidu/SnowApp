import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Service from "./service/Auth.service";

/* UI COMPONENTS */
import Navbar from "./components/ui/Navbar";

/* PAGE COMPONENTS */
import Index from "./components/pages/Index";
import Profile from "./components/pages/Profile";

/* AUTH COMPONENTS */
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import EditUser from "./components/auth/EditUser";

/* LESSON COMPONENTS */
import Dashboard from "./components/lessons/Dashboard";
import NewLesson from "./components/lessons/NewLesson";
import LessonCard from "./components/lessons/LessonCard";
import EditLesson from "./components/lessons/EditLesson";
import ViewProfile from "./components/pages/ViewProfile";

class App extends Component {
  constructor() {
    super();
    this.state = { loggedInUser: null };
    this._service = new Service();
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user });
    console.log(
      "El método 'setTheUser' de App.js se ha invocado, pasando al estado 'loggedInUser:",
      this.state.loggedInUser
    );
  };

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service
        .loggedin()
        .then(theLoggedInUserFromTheServer =>
          this.setState({ loggedInUser: theLoggedInUserFromTheServer.data })
        )
        .catch(err => {
          this.setState({ loggedInUser: false });
          console.log({ err });
        });
    }
  };

  render() {
    this.fetchUser();

    return (
      <>
        <Navbar
          loggedInUser={this.state.loggedInUser}
          setUser={this.setTheUser}
        />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route
            exact
            path="/signup"
            render={match => <Signup setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/login"
            render={match => <Login setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/profile"
            render={() =>
              this.state.loggedInUser ? (
                <Profile loggedInUser={this.state.loggedInUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/view/:id"
            render={props => (
              <ViewProfile loggedInUser={this.state.loggedInUser} {...props} />
            )}
          />
          {/* //fuera */}
          <Route
            path="/editUser"
            render={match =>
              this.state.loggedInUser ? (
                <EditUser
                  loggedInUser={this.state.loggedInUser}
                  {...match}
                  setUser={this.setTheUser}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/createLesson"
            render={match => (
              <NewLesson {...match} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <Route
            path="/delete/:id"
            render={match => (
              <EditLesson {...match} loggedInUser={this.state.loggedInUser} />
            )}
          />

          <Route
            path="/edit/:id"
            render={match => (
              <EditLesson {...match} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <Route
            path="/signup/:id"
            render={props => (
              <LessonCard {...props} loggedInUser={this.state.loggedInUser} />
            )}
          />

          {/* /fuera */}

          <Route
            path="/main"
            render={match => (
              <Dashboard {...match} loggedInUser={this.state.loggedInUser} />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default App;
