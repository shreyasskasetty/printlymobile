import React, { Component } from "react";

import PropTypes from "prop-types";

import { Switch, Redirect, Route } from "react-router-dom";

import HomePage from "../HomePage";
//import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import NotFoundPage from "../NotFoundPage";
import {BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

class Router extends Component {
  render() {
    // Properties
    const { user, bar,searchfield,onProfileOpen } = this.props;
    // Functions
    const { openSnackbar,onNearbyShopsClick } = this.props;

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
        {bar}

        <Switch>
          <Route path="/" exact>
            <HomePage user={user} openSnackbar={openSnackbar} searchField={searchfield} onNearbyShopsClick={onNearbyShopsClick}/>
          </Route>
          <Route path="/user/:userId">
            {user ? <UserPage onProfileOpen={onProfileOpen} /> : <Redirect to="/" />}
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
            
         
        </Switch>
      </BrowserRouter>
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
