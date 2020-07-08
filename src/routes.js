import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import ServicesIndexPage from './pages/Services/ServicesIndexPage';
import ServicesNewPage from './pages/Services/ServicesNewPage';
import ServicesEditPage from './pages/Services/ServicesEditPage';
import ServicesShowPage from './pages/Services/ServicesShowPage';

import CategoriesIndexPage from './pages/Categories/CategoriesIndexPage';
import CategoriesNewPage from './pages/Categories/CategoriesNewPage';
import CategoriesShowPage from './pages/Categories/CategoriesShowPage';
import CategoriesEditPage from './pages/Categories/CategoriesEditPage';

import CartsIndexPage from './pages/Carts/CartsIndexPage';
import CartsShowPage from './pages/Carts/CartsShowPage';

import AppointmentsIndexPage from './pages/Appointments/AppointmentsIndexPage';
import AppointmentsShowPage from './pages/Appointments/AppointmentsShowPage';

import UsersIndexPage from './pages/Users/UsersIndexPage';
import UsersNewPage from './pages/Users/UsersNewPage';
import UsersShowPage from './pages/Users/UsersShowPage';
import UsersEditPage from './pages/Users/UsersEditPage';

import LoginPage from './pages/Login/LoginPage';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (

  <HashRouter>
    <Switch>

      <PrivateRoute path="/" exact={true} component={ServicesIndexPage} />

      {/* Services */}
      <PrivateRoute path="/services" exact={true} component={ServicesIndexPage} />
      <PrivateRoute path="/services/new" exact={true} component={ServicesNewPage} />
      <PrivateRoute path="/services/:id" exact={true} component={ServicesShowPage} />
      <PrivateRoute path="/services/edit/:id" exact={true} component={ServicesEditPage} />
      {/* Services */}
      {/* Categories */}
      <PrivateRoute path="/categories" exact={true} component={CategoriesIndexPage} />
      <PrivateRoute path="/categories/new" exact={true} component={CategoriesNewPage} />
      <PrivateRoute path="/categories/:id" exact={true} component={CategoriesShowPage} />
      <PrivateRoute path="/categories/edit/:id" exact={true} component={CategoriesEditPage} />
      {/* Categories */}
      {/* Carts */}
      <PrivateRoute path="/carts" exact={true} component={CartsIndexPage} />
      <PrivateRoute path="/carts/:id" exact={true} component={CartsShowPage} />
      {/* Carts */}
      {/* Appointments */}
      <PrivateRoute path="/appointments" exact={true} component={AppointmentsIndexPage} />
      <PrivateRoute path="/appointments/:id" exact={true} component={AppointmentsShowPage} />
      {/* Appointments */}
      {/* Users */}
      <PrivateRoute path="/users" exact={true} component={UsersIndexPage} />
      <PrivateRoute path="/users/new" exact={true} component={UsersNewPage} />
      <PrivateRoute path="/users/:id" exact={true} component={UsersShowPage} />
      <PrivateRoute path="/users/edit/:id" exact={true} component={UsersEditPage} />
      {/* Users */}
      {/* Login */}
      <Route path="/login" exact={true} component={LoginPage} />
      {/* Login */}

    </Switch>
  </HashRouter>
);

export default Routes;
