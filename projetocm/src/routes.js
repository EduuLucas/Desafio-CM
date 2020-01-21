import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/main";
import PrivateRoute from "./PrivateRoute";
import userSelect from "./pages/userSelect";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/user" component={Home}/>
      <PrivateRoute exact path="/select" component={userSelect}/>      
      <Route exact path="/" component={Login}/>
      <Route exact path="/register" component={Register}/>
    </Switch>
  </Router>
)

export default Routes;