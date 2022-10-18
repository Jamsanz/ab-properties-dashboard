import React from "react";
import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { AB_PROPERTIES_TOKEN } from "../utils/constants";
import Login from "../views/auth/login";
import PageNotFound from "../views/pageNotFound";
import Users from "../views/manage-users";
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
    </Switch>
  );
};

export default Routes;
