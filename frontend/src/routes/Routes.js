import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import App from "../components/App";
import Users from "../components/Users";
import Vehicles from "../components/Vehicles";

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/vehicles" component={Vehicles} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
