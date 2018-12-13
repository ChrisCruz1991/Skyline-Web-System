import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { getFromStorage, removeInStorage } from "../utils/storage";
import CirecleUser from "../components/circleUser";

export default class Header extends Component {
  state = {
    isOpen: false,
    name: "",
    lastName: "",
    garageName: "",
    isLoading: true,
    success: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    console.log("Getting from storage", getFromStorage("object"));
    const token = getFromStorage("object");
    console.log(token.results);
    if (token.results) {
      this.setState({
        garageName: token.results.garage_name,
        name: token.results.employee_name,
        lastName: token.results.employee_last_name
      });
    }

    // if (success) {
    //   const {
    //     employee_name = null,
    //     employee_last_name = null,
    //     garage_name = null
    //   } = getFromStorage("object");
    //   console.log(getFromStorage("object"));
    //   this.setState({
    //     name: employee_name,
    //     lastName: employee_last_name,
    //     garageName: garage_name,
    //     success: true
    //   });
    // } else {
    //   return <Redirect to="/login" />;
    //   const url = window.location.href;
    //   console.log(url.includes("/login"));
    //   if (!(url.includes("/login") || url.includes("signup")))
    //     return <Redirect to="/login" />;
    //   else return null;
    // }
  }

  removeInStorage() {
    console.log("remove storage", removeInStorage("object"));
    this.setState({
      garageName: ""
    });
  }

  render() {
    const { name, lastName, garageName, isLoading, success } = this.state;
    console.log("re-rendering the header");
    const cirecleUser = garageName ? (
      <CirecleUser name={name} lastName={lastName} />
    ) : null;

    console.log("garage", garageName);

    const signOut = garageName ? (
      <NavItem onClick={() => removeInStorage("object")} className="mx-2">
        <Link to="/login" className="text-white my-3">
          Sign Out
        </Link>
      </NavItem>
    ) : null;

    const signUp = !garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/signup" className="text-white">
          Sign Up
        </Link>
      </NavItem>
    ) : null;

    const login = !garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/login" className="text-white">
          Log In
        </Link>
      </NavItem>
    ) : null;

    const services = garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/services" className="text-white ">
          Services
        </Link>
      </NavItem>
    ) : null;

    const clients = garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/clients" className="text-white ">
          Clients
        </Link>
      </NavItem>
    ) : null;

    const employees = garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/employees" className="text-white my-3">
          Employees
        </Link>
      </NavItem>
    ) : null;

    const dashboard = garageName ? (
      <NavItem>
        <Link to="/vehicle" className="text-white my-3">
          Dashboard
        </Link>
      </NavItem>
    ) : null;

    const dash = garageName ? (
      <NavItem className="my-auto mx-2">
        <Link to="/dashboard" className="text-white my-3" />
      </NavItem>
    ) : null;

    return (
      <header className="header">
        <Navbar expand="md" light className="bg-info fixed-top">
          <NavbarBrand className="text-white">Skyline Web-Systems</NavbarBrand>
          <NavbarToggler className="text-white" onClick={this.toggle} />
          <Collapse className="text-white" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white my-3">
                  Home
                </Link>
              </NavItem>
              {dash}
              {dashboard}
              {employees}
              {clients}
              {services}
              {signUp}
              {login}
              {signOut}
              {cirecleUser}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
