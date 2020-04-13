import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import NotFoundPage from "../NotFoundPage";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

class Router extends Component {
  render() {
    // Properties
    const { user, roles, bar,searchfield } = this.props;
    // Functions
    const { openSnackbar,onNearbyShopsClick } = this.props;

    return (
      <HashRouter basename='/'>
        {bar}

        <Switch>
          <Route path="/" exact>
            <HomePage user={user} openSnackbar={openSnackbar} searchField={searchfield} onNearbyShopsClick={onNearbyShopsClick}/>
            <Redirect from="/home" to="/"/>
          </Route>
          <Route path="/user/:userId">
            {user ? <UserPage /> : <Redirect to="/" />}
          </Route>

          <Route>
            <NotFoundPage />
          </Route>

        </Switch>
      </HashRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;
