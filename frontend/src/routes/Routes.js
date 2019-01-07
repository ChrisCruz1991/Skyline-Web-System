import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../components/Header";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/DashboardPage";
import VehiclePage from "../pages/VehiclePage";
import ClientsDashboard from "../pages/ClientsDashboard";
import ClientPage from "../pages/ClientPage";
import EmployeesDashboard from "../pages/EmployeesDashboard";
import EmployeePage from "../pages/EmployeePage";
import Home from "../pages/Home";
import EmployeesForm from "../pages/EmployeesForm";
import Membership from "../pages/Membership";
import NewVehiclePage from "../pages/NewVehiclePage";
import { decode } from "jwt-decode";
import { getFromStorage, setInStorage } from "../utils/storage";
import axios from "axios";
import ServicesDashboard from "../pages/ServicesDashboard";
import SpecificService from "../pages/SpecificService";
import ServicesNew from "../pages/ServicesNew";
import ServicesCreate from "../components/ServicesCreate";

const checkAuth = () => {
  console.log(getFromStorage("object"));
  const token = getFromStorage("object");
  if (!token.results.garage_name) return false;
  console.log("Este es el garage", token.results.garage_name);
  return true;
  // try {
  //   console.log("por aqui", decode(garage_name));
  //   const { exp } = decode(garage_name);
  //   console.log(exp);

  //   if (exp < new Date().getTime() / 1000) {
  //     return false;
  //   }
  // } catch (err) {
  //   return false;
  // }
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

// Tratando de hacer un re-render a header
// const onLogInClick = () => {
//   console.log("passando por routes");
//   const { email, password } = this.state;
//   axios
//     .post("http://localhost:8080/api/login", {
//       email,
//       password
//     })
//     .then(res => {
//       console.log(res);
//       if (res.data.success) {
//         console.log("Im in");
//         const obj = res.data.results;
//         setInStorage("object", obj);
//         this.props.history.push("/dashboard");
//       }
//     })
//     .catch(error => console.log(error));
// };

class Routes extends Component {
  render() {
    return (
      <Router>
        <div
          style={{
            height: "100vh",
            backgroundColor: "#f4f7f8",
            paddingTop: "3rem"
          }}>
          <Header />
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/vehicle" component={Dashboard} />
            <AuthRoute path="/vehicle/new/:id" component={NewVehiclePage} />
            <AuthRoute path="/vehicle/:id" component={VehiclePage} />
            <AuthRoute exact path="/clients" component={ClientsDashboard} />
            <AuthRoute path="/clients/new" component={Membership} />
            <AuthRoute path="/client/:id" component={ClientPage} />
            <AuthRoute exact path="/employees" component={EmployeesDashboard} />
            <AuthRoute path="/employees/new" component={EmployeesForm} />
            <AuthRoute path="/employee/:id" component={EmployeePage} />
            <AuthRoute exact path="/services/new" component={ServicesNew} />
            <AuthRoute
              path="/services/servicescreate/:id"
              component={ServicesCreate}
            />
            <AuthRoute path="/services" component={ServicesDashboard} />
            <AuthRoute path="/service/:id" component={SpecificService} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
