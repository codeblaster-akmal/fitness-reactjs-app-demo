/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { ThemeProvider } from "styled-components";
import { default as StyleVariables } from "./assets/jss/styleVariables";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import Signin from "views/MemberSignin/MemberSignin";

ReactDOM.render(
  <ThemeProvider theme={StyleVariables}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/signin" component={Signin} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/user" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
