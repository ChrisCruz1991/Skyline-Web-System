import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/DashboardPage";
import VehiclePage from "../pages/VehiclePage";
import ClientsDashboard from "../pages/ClientsDashboard";
import ClientPage from "../pages/ClientPage";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployeePage from "../pages/EmployeePage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="app">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/vehicle/:id" component={VehiclePage} />
              <Route path="/clients" component={ClientsDashboard} />
              <Route path="/client/:id" component={ClientPage} />
              <Route path="/employees" component={EmployeeDashboard} />
              <Route path="/employee/:id" component={EmployeePage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routes;
