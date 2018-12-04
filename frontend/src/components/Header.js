import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { getFromStorage } from "../utils/storage";

export default class Header extends Component {
  state = {
    isOpen: false,
    name: "",
    isLoading: true
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    const { employee_name } = getFromStorage("object");
    this.setState({
      name: employee_name
    });
  }

  render() {
    const { name, isLoading } = this.state;

    return (
      <header className="header">
        <Navbar color="dark" light expand="md">
          <NavbarBrand className="text-white">Skyline Web-Systems</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white my-3">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/vehicle" className="text-white my-3">
                  Dashboard
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/employees" className="text-white my-3">
                  Employees
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/clients" className="text-white ">
                  Clients
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white ">
                  Services
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/signup" className="text-white">
                  Sign Up
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/login" className="text-white">
                  Log In
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2 text-white">
                {name}
                's Garage
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
