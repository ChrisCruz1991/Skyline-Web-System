import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import App from "../components/App";
import Users from "../components/Users";
import Vehicles from "../components/vehicles/Vehicles";
import Vehicle from '../components/vehicles/Vehicle';
import Clients from '../components/clients/Clients'
import Employees from '../components/employees/Employees';
import Employee from '../components/employees/Employee';



class Routes extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/vehicle" component={Vehicles} />
            <Route path="/users" component={Users} />
            <Route exact path="/vehicle" component={Vehicles} />
            <Route path="/vehicle/:post_id" component={Vehicle} />
            <Route path="/clients" component={Clients} />
            <Route path="/employee" component={Employees} />
            <Route path="/employee/:post_id" component={Employee} />
          </Switch>
        </div>
      </div>
    </Router>
    )
  }
}

export default Routes;
