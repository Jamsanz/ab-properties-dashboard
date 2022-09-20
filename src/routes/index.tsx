import React from "react";
import {
  Redirect,
  // Redirect,
  Route,
  // RouteProps,
  Switch
} from "react-router-dom";
import { AB_PROPERTIES_TOKEN } from "../utils/constants";
import Dashboard from "../views/dashboard";
import Forms from "../views/forms";
import Login from "../views/auth/login";
import PageNotFound from "../views/pageNotFound";
import Users from "../views/manage-users";
import NewForm from "../views/form";
import Responses from "../views/responses";
import Response from "../views/response";
import CreateUser from "../views/create-user";

const token = window.localStorage.getItem(AB_PROPERTIES_TOKEN);

const PrivateRoute = ({ component: Component, ...props }: any) => (
  <Route
    {...props}
    render={(props: any) =>
      token ? <Component {...props} /> : <Redirect to={"/"} />
    }
  />
);

const PublicRoute = ({ component: Component, props }: any) => (
  <Route
    {...props}
    render={(props: any) =>
      token ? <Redirect to={"/manage-users"} /> : <Component {...props} />
    }
  />
);

const Routes = () => {
  return (
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PrivateRoute path="/manage-users" component={Users} />
      <PrivateRoute path="/create-user" component={CreateUser} />
      <Route path="*" component={PageNotFound} />
      {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
      {/* <PrivateRoute path="/responses" component={Responses} /> */}
      {/* <PrivateRoute path="/response" component={Response} /> */}
      {/* <PrivateRoute path="/forms" component={Forms} /> */}
      {/* <PrivateRoute path="/form" component={NewForm} /> */}
    </Switch>
  );
};

export default Routes;
